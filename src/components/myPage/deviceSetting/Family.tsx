import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Animated, { EasingNode } from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import deviceApi from "~/api/device";
import MyText from "~/components/common/MyText";
import Swipeable from "~/components/common/Swipeable";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import DeviceSettingTitle from "./DeviceSettingTitle";
import Bye from "~/assets/svg/myPage/bye.svg";
import SwipeableButton from "~/components/common/SwipeableButton";
import * as SecureStore from "expo-secure-store";
import { secureItems } from "~/constants";
import KeyWhite from "~/assets/svg/myPage/key-white.svg";
import KeyBlue from "~/assets/svg/myPage/key-blue.svg";

const Item = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(49)}px;
    padding-left: ${rpWidth(28)}px;
  `}
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const Li = styled.View<{ rpWidth: RpWidth }>`
  width:${({ rpWidth }) => rpWidth(47)}px
  align-items: center;
`;

const Family = ({
  isEdit,
  deviceID,
}: {
  isEdit: boolean;
  deviceID: number;
}) => {
  const { data } = deviceApi.useGetDeviceMembersQuery(deviceID);
  const { rpWidth } = useContext(DimensionsContext);
  const [myID, setMyID] = useState(0);

  useEffect(() => {
    SecureStore.getItemAsync(secureItems.userID).then(id => {
      if (id) setMyID(parseInt(id, 10));
    });
  }, []);

  const [showList, setShowList] = useState(false);

  const value1 = useRef(new Animated.Value(0)).current;

  const height = useMemo(() => {
    return showList && data ? data.members.length * rpWidth(49) : 1;
  }, [showList, data]);

  const heightInterpolate = value1.interpolate({
    inputRange: [0, height],
    outputRange: [0, height],
  });

  useEffect(() => {
    Animated.timing(value1, {
      toValue: height,
      duration: 200,
      easing: EasingNode.linear,
    }).start();
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
      <Animated.View style={{ height: heightInterpolate, overflow: "hidden" }}>
        {data?.members.map((member, i) => (
          <Animated.View key={`${member.user_id}-${i}`}>
            <Swipeable
              rightThreshold={rpWidth(36)}
              enableRightActions={isEdit}
              RenderRightActions={() =>
                myID === member.user_id || myID !== data?.owner_id ? (
                  <></>
                ) : (
                  <>
                    <SwipeableButton backgroundColor="red" onPress={() => {}}>
                      <Bye width={rpWidth(37)} height={rpWidth(32)} />
                    </SwipeableButton>
                    <SwipeableButton backgroundColor="blue" onPress={() => {}}>
                      <KeyWhite width={rpWidth(23)} height={rpWidth(23)} />
                    </SwipeableButton>
                  </>
                )
              }>
              <Item rpWidth={rpWidth}>
                <Li rpWidth={rpWidth}>
                  <MyText style={{ marginHorizontal: rpWidth(12) }}>
                    {data?.owner_id === member.user_id ? (
                      <KeyBlue width={rpWidth(19)} height={rpWidth(19)} />
                    ) : (
                      "•"
                    )}
                  </MyText>
                </Li>
                <MyText
                  color={
                    data?.owner_id === member.user_id
                      ? palette.blue_7b_90
                      : undefined
                  }>
                  {member.nickname}
                  {myID === member.user_id && " (나)"}
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
