import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import deviceApi from "~/api/device";
import MyText from "~/components/common/MyText";
import Swipeable from "~/components/common/Swipeable";
import palette from "~/styles/palette";
import SectionHeader from "./SectionHeader";
import Minus from "~/assets/svg/minus/minus-white.svg";
import SwipeableButton from "~/components/common/SwipeableButton";
import * as SecureStore from "expo-secure-store";
import { secureItems } from "~/constants";
import Crown from "~/assets/svg/myPage/crown.svg";
import CommonCenterModal from "../modal/CommonCenterModal";
import useModal from "~/hooks/useModal";
import Toast from "react-native-toast-message";
import Clipboard from "@react-native-clipboard/clipboard";
import { ToastType } from "~/styles/toast";

const Item = styled.View`
  height: 49px;
  padding-left: 75px;
  flex-direction: row;
  align-items: center;
  background-color: white;
  justify-content: space-between;
`;

const CrownContainer = styled.View`
  width: 78px;
  justify-content: center;
  align-items: center;
`;

const FamilySection = ({ deviceID }: { deviceID: number }) => {
  const { open, close, modalProps } = useModal();
  const { data } = deviceApi.useGetDeviceMembersQuery(deviceID, {
    refetchOnMountOrArgChange: true,
  });
  const [addMember, { data: codeData, isLoading }] =
    deviceApi.useLazyGetInvitationCodeQuery();
  const [deleteMember] = deviceApi.useDeleteDeviceMemberMutation();
  const [myID, setMyID] = useState(0);
  const [clickedID, setClickedID] = useState(0);

  useEffect(() => {
    SecureStore.getItemAsync(secureItems.userID).then(id => {
      if (id) setMyID(parseInt(id, 10));
    });
  }, []);

  useEffect(() => {
    if (!codeData) return;
    Clipboard.setString(codeData.code);
    Toast.show({
      type: ToastType.Notification,
      text1: "초대 코드가 클립보드에 복사되었습니다.",
      text2: "24시간 후 만료됩니다.",
    });
  }, [codeData]);

  const owner =
    data?.members[
      data.members.findIndex(member => member.id === data.owner_id)
    ];

  return (
    <>
      <SectionHeader
        type="family"
        onPlusButtonClick={() => {
          if (isLoading) return;
          addMember(deviceID);
        }}
        isLoading={isLoading}
        disablePlusButton={myID !== data?.owner_id}
      />
      <Item>
        <MyText color={palette.blue_7b}>{owner?.nickname}</MyText>
        <CrownContainer>
          <Crown />
        </CrownContainer>
      </Item>
      {data?.members
        .filter(member => member.id !== data.owner_id)
        .map(member => (
          <Swipeable
            key={member.id}
            rightThreshold={36}
            enableRightActions
            RenderRightActions={() => (
              <>
                {myID !== data.owner_id ? (
                  <></>
                ) : (
                  <SwipeableButton
                    backgroundColor="red"
                    onPress={() => {
                      setClickedID(member.id);
                      open();
                    }}>
                    <Minus />
                  </SwipeableButton>
                )}
              </>
            )}>
            <Item>
              <MyText
                color={
                  data?.owner_id === member.id ? palette.blue_86 : undefined
                }>
                {member.nickname}
                {myID === member.id && " (나)"}
              </MyText>
            </Item>
          </Swipeable>
        ))}
      <CommonCenterModal
        close={close}
        onRightButtonPress={() => {
          deleteMember({ deviceID, userID: clickedID });
          close();
        }}
        title="삭제하시나요?"
        rightButtonText="삭제"
        modalProps={modalProps}
      />
    </>
  );
};

export default FamilySection;
