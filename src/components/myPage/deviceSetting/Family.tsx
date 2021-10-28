import React, { useContext, useEffect, useMemo, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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
import useError from "~/hooks/useError";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useNavigation } from "@react-navigation/native";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";

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
  width: ${({ rpWidth }) => rpWidth(47)}px;
  align-items: center;
`;

const Family = ({
  isEdit,
  deviceID,
}: {
  isEdit: boolean;
  deviceID: number;
}) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const { data } = deviceApi.useGetDeviceMembersQuery(deviceID, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteMember, { error: deleteError }] =
    deviceApi.useDeleteDeviceMemberMutation();
  const [updateOwner, { error: updateError }] =
    deviceApi.useUpdateDeviceOwnerMutation();
  const { rpWidth } = useContext(DimensionsContext);
  const [myID, setMyID] = useState(0);

  const callback = (error: FetchBaseQueryError) => {
    if (error.data.detail === "Device id does not exist.") {
      navigation.goBack();
    }
  };

  useError({
    error: deleteError,
    type: "Device",
    callback: () => callback(deleteError as FetchBaseQueryError),
  });
  useError({
    error: updateError,
    type: "Device",
    callback: () => callback(updateError as FetchBaseQueryError),
  });

  useEffect(() => {
    SecureStore.getItemAsync(secureItems.userID).then(id => {
      if (id) setMyID(parseInt(id, 10));
    });
  }, []);

  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (isEdit) setShowList(true);
  }, [isEdit]);

  const itemHeight = rpWidth(49);

  const height = useMemo(() => {
    return showList && data ? data.members.length * itemHeight : 1;
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
              rightThreshold={rpWidth(36)}
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
                      <Bye width={rpWidth(37)} height={rpWidth(32)} />
                    </SwipeableButton>
                    <SwipeableButton
                      backgroundColor="blue"
                      onPress={() => {
                        updateOwner({ deviceID, userID: member.id });
                      }}>
                      <KeyWhite width={rpWidth(22)} height={rpWidth(22)} />
                    </SwipeableButton>
                  </>
                )
              }>
              <Item rpWidth={rpWidth}>
                <Li rpWidth={rpWidth}>
                  <MyText style={{ marginHorizontal: rpWidth(12) }}>
                    {data?.owner_id === member.id ? (
                      <KeyBlue width={rpWidth(19)} height={rpWidth(19)} />
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
