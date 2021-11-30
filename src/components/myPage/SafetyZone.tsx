import React, { useMemo } from "react";
import styled from "styled-components/native";
import MyText from "../common/MyText";

import Swipeable from "../common/Swipeable";
import ListItem from "../common/ListItem";
import Trashcan from "~/assets/svg/trashcan/trashcan-white.svg";
import DeviceSettingTitle from "./DeviceSettingTitle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import SwipeableButton from "~/components/common/SwipeableButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { noAvatar } from "~/constants";

const RowContainer = styled.View`
  flex-shrink: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  margin-right: 19px;
`;

const TextContainer = styled.View`
  flex-shrink: 1;
  padding-right: 32px;
`;

const SafetyZone = () => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const dispatch = useDispatch();
  const result = useAppSelector(state => state.deviceSetting.safetyZone.result);

  const itemHeight = 99;
  const listPaddingBottom = 35;

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
        type="safetyZone"
        disablePlusButton={result.filter(item => item.name).length > 2}
        onPlusButtonClick={() => {
          dispatch(
            deviceSettingActions.setSafetyZone({
              currentId:
                result[result.findIndex(item => !item.name)].safety_area_id,
              fromDeviceSetting: true,
            }),
          );
          navigation.navigate("BleRootStackNav", {
            initialRouteName: "BleWithoutHeaderStackNav",
            initialBleWithoutHeaderStackNavRouteName: "SafetyZone",
          });
        }}
      />
      <Animated.View style={[animatedStyle]}>
        {result.map(
          (
            {
              safety_area_id: id,
              name,
              address,
              coordinate: { coordinates },
              thumbnail,
              radius,
            },
            i,
          ) =>
            name ? (
              <Swipeable
                key={id}
                animate={i === 0}
                RenderRightActions={() => (
                  <SwipeableButton
                    backgroundColor="red"
                    onPress={() => {
                      dispatch(deviceSettingActions.deleteSafetyZone(id));
                    }}>
                    <Trashcan width={22} height={24} />
                  </SwipeableButton>
                )}
                enableRightActions>
                <ListItem
                  style={{ paddingRight: 36 }}
                  onPress={() => {
                    dispatch(
                      deviceSettingActions.setSafetyZone({
                        draft: {
                          name,
                          address: address || "",
                          coord: {
                            latitude: coordinates[1],
                            longitude: coordinates[0],
                          },
                          radius,
                        },
                        fromDeviceSetting: true,
                        currentId: id,
                      }),
                    );
                    navigation.navigate("BleRootStackNav", {
                      initialRouteName: "BleWithoutHeaderStackNav",
                      initialBleWithoutHeaderStackNavRouteName: "SafetyZone",
                    });
                  }}>
                  <RowContainer>
                    <Image source={thumbnail ? { uri: thumbnail } : noAvatar} />
                    <TextContainer>
                      <MyText
                        numberOfLines={1}
                        fontSize={12}
                        color="rgba(0, 0, 0, 0.3)">
                        {address || "주소 없음"}
                      </MyText>
                      <RowContainer style={{ marginTop: 10 }}>
                        <MyText
                          color="rgba(0, 0, 0, 0.7)"
                          numberOfLines={1}
                          style={{ width: "50%" }}>
                          {name}
                        </MyText>
                        <MyText
                          style={{ width: "50%" }}
                          color="rgba(0, 0, 0, 0.7)">
                          {radius}m
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
