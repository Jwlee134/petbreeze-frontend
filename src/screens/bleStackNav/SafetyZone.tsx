import React, { useMemo } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import { rpWidth } from "~/styles";
import FakeMarker from "~/components/safetyZone/FakeMarker";
import useKeyboard from "~/hooks/useKeyboard";
import SafetyZoneMap from "~/components/safetyZone/SafetyZoneMap";
import Arrow from "~/assets/svg/arrow/arrow-left-blue.svg";
import { isAndroid, isIos } from "~/utils";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { safetyZoneActions } from "~/store/safetyZone";
import Geolocation from "react-native-geolocation-service";
import MapFloatingCircle from "~/components/common/MapFloatingCircle";
import { SafetyZoneScreenNavigationProp } from "~/types/navigator";
import SafetyZoneMapBottomSheet from "~/components/safetyZone/SafetyZoneMapBottomSheet";
import SearchBar from "~/components/safetyZone/SearchBar";

const Container = styled.View`
  flex: 1;
`;

const BackButton = styled.TouchableOpacity`
  width: ${rpWidth(44)}px;
  height: ${rpWidth(44)}px;
  position: absolute;
  left: 0;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

const SafetyZone = ({
  navigation,
}: {
  navigation: SafetyZoneScreenNavigationProp;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { keyboardHeight } = useKeyboard();

  const step2 = useAppSelector(state => state.safetyZone.step2);

  const dispatch = useDispatch();

  const handleMyLocation = () => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(safetyZoneActions.setAnimateCamera(true));
        dispatch(safetyZoneActions.setCoord({ latitude, longitude }));
      },
      err => {
        Alert.alert("알림", "위치를 가져올 수 없습니다.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const snapPoints = useMemo(
    () => [
      !keyboardHeight
        ? rpWidth(157) + bottom
        : rpWidth(60) + (isIos ? keyboardHeight : 0),
    ],
    [keyboardHeight],
  );
  // mapPadding 변경 시 지도 크기 줄어들 때 센터 변경됨
  const mapPadding = { top: rpWidth(82), bottom: rpWidth(82) };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <SafetyZoneMap snapPoints={snapPoints} mapPadding={mapPadding} />
        <FakeMarker mapPadding={mapPadding} snapPoints={snapPoints} />
        {!step2 ? (
          <>
            <Button
              style={{
                position: "absolute",
                bottom: rpWidth(32) + bottom,
                alignSelf: "center",
                zIndex: 1,
              }}
              onPress={() => dispatch(safetyZoneActions.setStep2(true))}>
              다음
            </Button>
            <MapFloatingCircle
              style={{
                position: "absolute",
                right: rpWidth(17),
                bottom: rpWidth(106) + bottom,
                zIndex: 1,
              }}
              icon="myLocation"
              onPress={handleMyLocation}
            />
            <SearchBar />
          </>
        ) : (
          <>
            <BackButton
              onPress={() => dispatch(safetyZoneActions.setStep2(false))}
              style={{
                top,
              }}>
              <Arrow width={rpWidth(12)} height={rpWidth(20)} />
            </BackButton>
            <SafetyZoneMapBottomSheet snapPoints={snapPoints} />
          </>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SafetyZone;
