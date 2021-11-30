import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import deviceApi from "~/api/device";
import MyText from "~/components/common/MyText";
import Swipeable from "~/components/common/Swipeable";
import palette from "~/styles/palette";
import DeviceSettingTitle from "./DeviceSettingTitle";
import Bye from "~/assets/svg/myPage/bye.svg";
import SwipeableButton from "~/components/common/SwipeableButton";
import * as SecureStore from "expo-secure-store";
import { secureItems } from "~/constants";
import KeyWhite from "~/assets/svg/myPage/key-white.svg";
import KeyBlue from "~/assets/svg/myPage/key-blue.svg";

const Item = styled.View`
  height: 49px;
  padding-left: 28px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const Li = styled.View`
  width: 47px;
  align-items: center;
`;

const Family = ({ deviceID }: { deviceID: number }) => {
  const { data } = deviceApi.useGetDeviceMembersQuery(deviceID, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteMember] = deviceApi.useDeleteDeviceMemberMutation();
  const [updateOwner] = deviceApi.useUpdateDeviceOwnerMutation();
  const [myID, setMyID] = useState(0);

  useEffect(() => {
    SecureStore.getItemAsync(secureItems.userID).then(id => {
      if (id) setMyID(parseInt(id, 10));
    });
  }, []);

  return (
    <>
      <DeviceSettingTitle type="family" disablePlusButton />
      {data?.members.map(member => (
        <Swipeable
          key={member.id}
          rightThreshold={36}
          enableRightActions
          RenderRightActions={() =>
            myID === member.id || myID !== data?.owner_id ? (
              <></>
            ) : (
              <>
                <SwipeableButton
                  backgroundColor="red"
                  onPress={() => {
                    deleteMember({ deviceID, userID: member.id });
                  }}>
                  <Bye width={37} height={32} />
                </SwipeableButton>
                <SwipeableButton
                  backgroundColor="blue"
                  onPress={() => {
                    updateOwner({ deviceID, userID: member.id });
                  }}>
                  <KeyWhite width={22} height={22} />
                </SwipeableButton>
              </>
            )
          }>
          <Item>
            <Li>
              <MyText style={{ marginHorizontal: 12 }}>
                {data?.owner_id === member.id ? (
                  <KeyBlue width={19} height={19} />
                ) : (
                  "•"
                )}
              </MyText>
            </Li>
            <MyText
              color={
                data?.owner_id === member.id ? palette.blue_7b_90 : undefined
              }>
              {member.nickname}
              {myID === member.id && " (나)"}
            </MyText>
          </Item>
        </Swipeable>
      ))}
    </>
  );
};

export default Family;
