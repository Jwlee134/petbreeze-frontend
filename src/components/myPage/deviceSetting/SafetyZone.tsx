import React, { useContext, useMemo } from "react";
import styled, { css } from "styled-components/native";
import MyText from "../../common/MyText";

import Swipeable from "../../common/Swipeable";
import ListItem from "../../common/ListItem";
import Trashcan from "~/assets/svg/trashcan/trashcan-white.svg";
import DeviceSettingTitle from "./DeviceSettingTitle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { navigatorActions } from "~/store/navigator";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import SwipeableButton from "~/components/common/SwipeableButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const RowContainer = styled.View`
  flex-shrink: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Image = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(70)}px;
    margin-right: ${rpWidth(19)}px;
  `}
`;

const TextContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-shrink: 1;
  padding-right: ${({ rpWidth }) => rpWidth(32)}px;
`;

const SafetyZone = ({ isEdit }: { isEdit: boolean }) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const dispatch = useDispatch();
  const result = useAppSelector(state => state.deviceSetting.safetyZone.result);
  const { rpWidth } = useContext(DimensionsContext);

  const itemHeight = rpWidth(99);
  const listPaddingBottom = rpWidth(35);

  const height = useMemo(() => {
    return result.filter(item => item.name).length
      ? result.filter(item => item.name).length * itemHeight + listPaddingBottom
      : 1;
  }, [result.filter(item => item.name).length]);

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
        isEdit={isEdit}
        disableArrowButton
        type="safetyZone"
        disablePlusButton={result.filter(item => item.name).length > 2}
        onPlusButtonClick={() => {
          dispatch(
            deviceSettingActions.setSafetyZone({
              currentId: result[result.findIndex(item => !item.name)].id,
              fromDeviceSetting: true,
            }),
          );
          dispatch(
            navigatorActions.setInitialRoute({
              initialBleRootStackNavRouteName: "BleWithoutHeaderStackNav",
              initialBleWithoutHeaderStackNavRouteName: "SafetyZone",
            }),
          );
          navigation.navigate("BleRootStackNav");
        }}
      />
      <Animated.View style={[animatedStyle]}>
        {result.map(({ id, name, address, data, image }, i) =>
          name ? (
            <Swipeable
              key={id}
              animate={isEdit && i === 0}
              RenderRightActions={() => (
                <SwipeableButton
                  backgroundColor="red"
                  onPress={() => {
                    dispatch(deviceSettingActions.deleteSafetyZone(id));
                  }}>
                  <Trashcan width={rpWidth(22)} height={rpWidth(24)} />
                </SwipeableButton>
              )}
              enableRightActions={isEdit}>
              <ListItem
                style={{ paddingRight: rpWidth(36) }}
                onPress={() => {
                  if (!isEdit) return;
                  dispatch(
                    deviceSettingActions.setSafetyZone({
                      draft: {
                        name,
                        address,
                        coord: {
                          latitude: data[0],
                          longitude: data[1],
                        },
                        radius: data[2],
                      },
                      fromDeviceSetting: true,
                      currentId: id,
                    }),
                  );
                  dispatch(
                    navigatorActions.setInitialRoute({
                      initialBleRootStackNavRouteName:
                        "BleWithoutHeaderStackNav",
                      initialBleWithoutHeaderStackNavRouteName: "SafetyZone",
                    }),
                  );
                  navigation.navigate("BleRootStackNav");
                }}
                showIcon={isEdit}>
                <RowContainer>
                  <Image rpWidth={rpWidth} source={{ uri: image }} />
                  <TextContainer rpWidth={rpWidth}>
                    <MyText
                      numberOfLines={1}
                      fontSize={rpWidth(12)}
                      color="rgba(0, 0, 0, 0.3)">
                      {address}
                    </MyText>
                    <RowContainer style={{ marginTop: rpWidth(10) }}>
                      <MyText
                        color="rgba(0, 0, 0, 0.7)"
                        numberOfLines={1}
                        style={{ width: "50%" }}>
                        {name}
                      </MyText>
                      <MyText
                        style={{ width: "50%" }}
                        color="rgba(0, 0, 0, 0.7)">
                        {data[2]}m
                      </MyText>
                    </RowContainer>
                  </TextContainer>
                </RowContainer>
              </ListItem>
            </Swipeable>
          ) : null,
        )}
      </Animated.View>
    </>
  );
};

export default SafetyZone;
