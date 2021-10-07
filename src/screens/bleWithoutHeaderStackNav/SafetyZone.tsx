import React, { useContext, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import FakeMarker from "~/components/safetyZone/FakeMarker";
import SafetyZoneMap from "~/components/safetyZone/SafetyZoneMap";
import Arrow from "~/assets/svg/arrow/arrow-left-blue.svg";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import Geolocation from "react-native-geolocation-service";
import MapButton from "~/components/map/MapButton";
import SafetyZoneMapBottomSheet from "~/components/safetyZone/SafetyZoneMapBottomSheet";
import SearchBar from "~/components/safetyZone/SearchBar";
import { deviceSettingActions } from "~/store/deviceSetting";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BackButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(44)}px;
    height: ${rpWidth(44)}px;
  `}
  position: absolute;
  left: 0;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

const SafetyZone = () => {
  const { rpWidth } = useContext(DimensionsContext);
  const { top, bottom } = useSafeAreaInsets();

  const step2 = useAppSelector(state => state.deviceSetting.safetyZone.step2);
  const dispatch = useDispatch();

  const handleMyLocation = () => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(
          deviceSettingActions.setSafetyZone({
            animateCamera: true,
          }),
        );
        dispatch(
          deviceSettingActions.setSafetyZone({
            draft: { coord: { latitude, longitude } },
          }),
        );
      },
      err => {
        Alert.alert("알림", "위치를 가져올 수 없습니다.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const bottomSheetHeight = rpWidth(188) + bottom;
  const mapPadding = {
    top: rpWidth(82),
    bottom: rpWidth(82),
  };

  const value = useRef(new Animated.Value(0)).current;

  const translateYMap = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -bottomSheetHeight + mapPadding.bottom],
  });

  const translateYBottomSheet = value.interpolate({
    inputRange: [0, 1],
    outputRange: [bottomSheetHeight, 0],
  });

  const exp = (t: number) =>
    Math.min(Math.max(0, Math.pow(2, 10 * (t - 1))), 1);

  useEffect(() => {
    Animated.timing(value, {
      toValue: !step2 ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(exp),
    }).start();
  }, [step2]);

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.setSafetyZone(null));
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <SafetyZoneMap value={translateYMap} mapPadding={mapPadding} />
        <FakeMarker value={translateYMap} mapPadding={mapPadding} />
        {!step2 ? (
          <>
            <Button
              style={{
                position: "absolute",
                bottom: rpWidth(32) + bottom,
                alignSelf: "center",
                zIndex: 0,
              }}
              onPress={() =>
                dispatch(
                  deviceSettingActions.setSafetyZone({
                    step2: true,
                  }),
                )
              }>
              다음
            </Button>
            <MapButton
              style={{
                position: "absolute",
                right: rpWidth(17),
                bottom: rpWidth(108) + bottom,
                zIndex: 0,
              }}
              icon="myLocation"
              onPress={handleMyLocation}
            />
            <SearchBar />
          </>
        ) : (
          <>
            <BackButton
              rpWidth={rpWidth}
              onPress={() =>
                dispatch(
                  deviceSettingActions.setSafetyZone({
                    step2: false,
                  }),
                )
              }
              style={{
                top,
              }}>
              <Arrow width={rpWidth(12)} height={rpWidth(20)} />
            </BackButton>
            <SafetyZoneMapBottomSheet
              value={translateYBottomSheet}
              height={bottomSheetHeight}
            />
          </>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SafetyZone;
