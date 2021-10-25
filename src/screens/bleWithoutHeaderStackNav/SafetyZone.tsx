import React, { useContext, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import FakeMarker from "~/components/safetyZone/FakeMarker";
import SafetyZoneMap from "~/components/safetyZone/SafetyZoneMap";
import Arrow from "~/assets/svg/arrow/arrow-left-blue.svg";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import Geolocation from "react-native-geolocation-service";
import MapButton from "~/components/common/MapButton";
import SafetyZoneMapBottomSheet from "~/components/safetyZone/SafetyZoneMapBottomSheet";
import SearchBar from "~/components/safetyZone/SearchBar";
import { deviceSettingActions } from "~/store/deviceSetting";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import Toast from "react-native-toast-message";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Dissolve from "~/components/common/Dissolve";

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
      () => {
        Toast.show({
          type: "error",
          text1: "위치를 불러올 수 없습니다.",
          text2: "위치가 켜져 있거나 위치 권한이 허용되어 있는지 확인하세요.",
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const bottomSheetHeight = rpWidth(188) + bottom;
  const mapPadding = {
    top: rpWidth(82),
    bottom: rpWidth(82),
  };

  const mapMarginBottom = useSharedValue(0);
  const mapStyle = useAnimatedStyle(() => {
    mapMarginBottom.value = !step2 ? 0 : bottomSheetHeight - mapPadding.bottom;
    return {
      marginBottom: withTiming(mapMarginBottom.value, { duration: 400 }),
    };
  }, [step2]);

  const markerMarginBottom = useSharedValue(mapPadding.bottom);
  const markerStyle = useAnimatedStyle(() => {
    markerMarginBottom.value = !step2 ? mapPadding.bottom : bottomSheetHeight;
    return {
      marginBottom: withTiming(markerMarginBottom.value, { duration: 400 }),
    };
  }, [step2]);

  const translateY = useSharedValue(bottomSheetHeight);
  const bottomSheetStyle = useAnimatedStyle(() => {
    translateY.value = !step2 ? bottomSheetHeight : 0;
    return {
      transform: [
        { translateY: withTiming(translateY.value, { duration: 400 }) },
      ],
    };
  }, [step2]);

  useEffect(() => {
    return () => {
      dispatch(
        deviceSettingActions.setSafetyZone({
          isSubmitting: false,
          step2: false,
        }),
      );
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <SafetyZoneMap style={mapStyle} mapPadding={mapPadding} />
        <FakeMarker style={markerStyle} mapPadding={mapPadding} />
        <Dissolve
          isVisible={!step2}
          style={{
            position: "absolute",
            bottom: rpWidth(32) + bottom,
            alignSelf: "center",
            zIndex: 0,
          }}>
          <Button
            onPress={() =>
              dispatch(
                deviceSettingActions.setSafetyZone({
                  step2: true,
                }),
              )
            }>
            다음
          </Button>
        </Dissolve>
        <Dissolve
          isVisible={!step2}
          style={{
            position: "absolute",
            right: rpWidth(17),
            bottom: rpWidth(108) + bottom,
            zIndex: 0,
          }}>
          <MapButton icon="myLocation" onPress={handleMyLocation} />
        </Dissolve>
        {!step2 ? (
          <>
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
          </>
        )}
        <SafetyZoneMapBottomSheet
          style={bottomSheetStyle}
          height={bottomSheetHeight}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SafetyZone;
