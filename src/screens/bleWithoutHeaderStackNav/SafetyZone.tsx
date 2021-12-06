import React, { useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
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
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Dissolve from "~/components/common/Dissolve";
import Toast from "react-native-toast-message";
import permissionCheck from "~/utils/permissionCheck";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  position: absolute;
  left: 0;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

const SafetyZone = () => {
  const { top, bottom } = useSafeAreaInsets();

  const step2 = useAppSelector(state => state.deviceSetting.area.step2);
  const dispatch = useDispatch();

  const handleMyLocation = async () => {
    try {
      await permissionCheck.location();
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          dispatch(deviceSettingActions.setArea({ animateCamera: true }));
          dispatch(
            deviceSettingActions.setAreaDraft({
              coord: { latitude, longitude },
            }),
          );
        },
        () => {
          Toast.show({ type: "error", text1: "위치를 불러올 수 없습니다." });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch {}
  };

  const bottomSheetHeight = 188 + bottom;
  const mapPadding = {
    top: 82,
    bottom: 82,
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
        deviceSettingActions.setArea({
          isSubmitting: false,
          step2: false,
        }),
      );
    };
  }, []);

  const onNext = () => {
    dispatch(deviceSettingActions.setArea({ step2: true }));
  };

  const onBack = () => {
    dispatch(deviceSettingActions.setArea({ step2: false }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <SafetyZoneMap style={mapStyle} mapPadding={mapPadding} />
        <FakeMarker style={markerStyle} mapPadding={mapPadding} />
        <Dissolve
          isVisible={!step2}
          style={{
            position: "absolute",
            bottom: 32 + bottom,
            alignSelf: "center",
            zIndex: 0,
          }}>
          <Button onPress={onNext}>다음</Button>
        </Dissolve>
        <Dissolve
          isVisible={!step2}
          style={{
            position: "absolute",
            right: 17,
            bottom: 108 + bottom,
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
              onPress={onBack}
              style={{
                top,
              }}>
              <Arrow width={12} height={20} />
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
