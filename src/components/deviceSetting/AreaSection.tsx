import React, { useMemo, useState } from "react";
import styled from "styled-components/native";
import MyText from "../common/MyText";
import Minus from "~/assets/svg/minus/minus-white.svg";
import Swipeable from "../common/Swipeable";
import ListItem from "../common/ListItem";
import SectionHeader from "./SectionHeader";
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
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import useModal from "~/hooks/useModal";
import { AreaResponse } from "~/api/device";

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

const AreaSection = () => {
  const [clickedID, setClickedID] = useState(0);
  const { open, close, modalProps } = useModal();
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const dispatch = useDispatch();
  const result = useAppSelector(
    state => state.deviceSetting.result.safety_areas,
  );

  const itemHeight = 99;
  const listPaddingBottom = 11;

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

  const onPlusButtonPress = () => {
    dispatch(
      deviceSettingActions.setArea({
        currentID:
          result[result.findIndex(item => !item.name)].safety_area_number,
      }),
    );
    navigation.navigate("UpdateArea");
  };

  const onAreaPress = (data: AreaResponse) => {
    dispatch(
      deviceSettingActions.setArea({
        fromDeviceSetting: true,
        currentID: data.safety_area_number,
      }),
    );
    dispatch(
      deviceSettingActions.setAreaDraft({
        name: data.name || "",
        address: data.address || "",
        coord: {
          latitude: data.coordinate.coordinates[1],
          longitude: data.coordinate.coordinates[0],
        },
        radius: data.radius,
      }),
    );
    navigation.navigate("UpdateArea");
    /* navigation.navigate("BleRootStackNav", {
      initialRouteName: "BleWithoutHeaderStackNav",
      initialBleWithoutHeaderStackNavRouteName: "Area",
    }); */
  };

  return (
    <>
      <SectionHeader
        type="area"
        disablePlusButton={result.filter(item => item.name).length > 2}
        onPlusButtonClick={onPlusButtonPress}
      />
      <Animated.View style={[animatedStyle]}>
        {result.map((data, i) =>
          data.name ? (
            <Swipeable
              key={data.safety_area_number}
              animate={i === 0}
              RenderRightActions={() => (
                <SwipeableButton
                  backgroundColor="red"
                  onPress={() => {
                    setClickedID(data.safety_area_number);
                    open();
                  }}>
                  <Minus />
                </SwipeableButton>
              )}
              enableRightActions>
              <ListItem
                style={{ paddingRight: 36, height: 99 }}
                onPress={() => onAreaPress(data)}>
                <RowContainer>
                  <Image
                    source={data.thumbnail ? { uri: data.thumbnail } : noAvatar}
                  />
                  <TextContainer>
                    <MyText
                      numberOfLines={1}
                      fontSize={12}
                      color="rgba(0, 0, 0, 0.3)">
                      {data.address || "주소 없음"}
                    </MyText>
                    <RowContainer style={{ marginTop: 10 }}>
                      <MyText
                        color="rgba(0, 0, 0, 0.7)"
                        numberOfLines={1}
                        style={{ width: "50%" }}>
                        {data.name}
                      </MyText>
                      <MyText
                        style={{ width: "50%" }}
                        color="rgba(0, 0, 0, 0.7)">
                        {data.radius}m
                      </MyText>
                    </RowContainer>
                  </TextContainer>
                </RowContainer>
              </ListItem>
            </Swipeable>
          ) : null,
        )}
      </Animated.View>
      <CommonCenterModal
        close={close}
        onRightButtonPress={() => {
          dispatch(deviceSettingActions.deleteAreaResult(clickedID));
          close();
        }}
        title="삭제하시나요?"
        rightButtonText="삭제"
        modalProps={modalProps}
      />
    </>
  );
};

export default AreaSection;
