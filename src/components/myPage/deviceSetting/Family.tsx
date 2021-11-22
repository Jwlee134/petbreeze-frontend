import React, { useEffect, useMemo, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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

const Family = ({
  isEdit,
  deviceID,
}: {
  isEdit: boolean;
  deviceID: number;
}) => {
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

  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (isEdit) setShowList(true);
  }, [isEdit]);

  const height = useMemo(() => {
    return showList && data ? data.members.length * 49 : 1;
  }, [showList, data]);

  const heightValue = useSharedValue(height);

  const animatedStyle = useAnimatedStyle(() => {
    heightValue.value = height;
    return {
      height: withTiming(heightValue.value, {
        duration: 200,
      }),
    };
  }, [height]);

  return (
    <>
      <DeviceSettingTitle
        type="family"
        isEdit={isEdit}
        showList={showList}
        disablePlusButton
        disableArrowButton={!data?.members.length}
        onArrowButtonClick={() => {
          setShowList(!showList);
        }}
      />
      <Animated.View style={[{ overflow: "hidden" }, animatedStyle]}>
        {data?.members.map((member, i) => (
          <Animated.View key={`${member.id}-${i}`}>
            <Swipeable
              rightThreshold={36}
              enableRightActions={isEdit}
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
                    data?.owner_id === member.id
                      ? palette.blue_7b_90
                      : undefined
                  }>
                  {member.nickname}
                  {myID === member.id && " (나)"}
                </MyText>
              </Item>
            </Swipeable>
          </Animated.View>
        ))}
      </Animated.View>
    </>
  );
};

export default Family;
