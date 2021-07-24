import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import useMap from "~/hooks/useMap";
import { height, width } from "~/styles";
import { get4PointsAroundCircumference, isAndroid, isIos } from "~/utils";
import Button from "../common/Button";

import MyLocation from "~/assets/svg/my-location.svg";
import useMyLocation from "~/hooks/useMyLocation";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

import ShadowContainer from "../common/ShadowContainer";
import { useEffect } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Input from "../common/Input";
import { Camera, Circle } from "react-native-maps";
import { Alert, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import useDisableButton from "~/hooks/useDisableButton";
import { useUpdateSafetyZoneMutation } from "~/api/device";

const Container = styled.KeyboardAvoidingView`
  width: ${width}px;
  height: ${height}px;
`;

const BottomContainer = styled.View`
  width: ${width}px;
  background-color: white;
  padding: 24px;
  justify-content: flex-end;
`;

const MyLocationCircle = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InputWrapper = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  width: ${width / 2 - 30}px;
`;

const OuterMarker = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: white;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InnerMarker = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${palette.blue_6e};
`;

const options = ["100m", "200m", "300m", "500m", "1km", "취소"];
const destructiveButtonIndex = 0;
const cancelButtonIndex = 5;
const edgePadding = isIos ? 75 : 100;

const SafetyZoneMap = ({
  handleComplete,
  id = 1,
}: {
  handleComplete?: () => void;
  id?: number;
}) => {
  const { Map, mapRef, camera } = useMap();
  const { disable, disabled } = useDisableButton();
  const { isTracking, startTracking, clearTracking } = useMyLocation();
  const { latitude, longitude } = useAppSelector(state => state.map.myCoords);
  const deviceId = useAppSelector(
    state => state.storage.device.deviceIdInProgress,
  );
  const { showActionSheetWithOptions } = useActionSheet();
  const circleRef = useRef<Circle>(null);
  const dispatch = useDispatch();

  const [bottomHeight, setBottomHeight] = useState(0);
  const [isCameraMoved, setIsCameraMoved] = useState(false);
  const [name, setName] = useState("");
  const [radius, setRadius] = useState("");
  const [currentCamera, setCurrentCamera] = useState<Camera | null>(null);

  const [updateSafetyZone, result] = useUpdateSafetyZoneMutation();

  const radiusValue =
    Number(radius.replace(/\D/g, "")) === 1
      ? 1000
      : Number(radius.replace(/\D/g, ""));

  // 원의 top, bottom, left, right 좌표 추출
  // 반경 변경 시 원 크기에 맞게 fitToCoordinates 메소드 사용하기 위함
  const coordsArr = useMemo(() => {
    if (currentCamera) {
      return get4PointsAroundCircumference(
        currentCamera.center.latitude,
        currentCamera.center.longitude,
        radiusValue,
      );
    }
  }, [radiusValue]);

  // 내 위치 클릭하여 위치에 맞게 지도 조절, 내 위치가 계속 변경되어도 지도가 내 위치를 따라가지 않음
  useEffect(() => {
    if (!mapRef.current) return;
    if (latitude && longitude && !isCameraMoved) {
      mapRef.current.animateCamera({
        center: { latitude, longitude },
        ...(!radiusValue && { zoom: 17 }),
      });
      setIsCameraMoved(true);
    }
  }, [mapRef, latitude, longitude, isCameraMoved, radiusValue]);

  // 반경 변경 시 원 edgePadding 만큼 지도 줌 자동 조절
  useEffect(() => {
    if (!mapRef.current || !radiusValue) return;
    mapRef.current.fitToCoordinates(coordsArr, {
      edgePadding: {
        left: edgePadding,
        right: edgePadding,
        top: edgePadding,
        bottom: edgePadding,
      },
    });
  }, [mapRef, radiusValue]);

  // Circle 스타일 설정 (iOS 전용으로, iOS에서 스타일이 적용되지 않는 버그 때문)
  useEffect(() => {
    if (!circleRef.current || isAndroid || !radiusValue) {
      return;
    }
    setTimeout(() => {
      circleRef.current?.setNativeProps({
        fillColor: "rgba(83, 135, 188, 0.2)",
        strokeColor: "rgba(83, 135, 188, 0.5)",
        strokeWidth: 2,
      });
    }, 10);
  }, [circleRef, radiusValue]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const showing = Keyboard.addListener("keyboardDidShow", () => {
      setShow(true);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setShow(false);
    });
    return () => {
      showing.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    if (result.isSuccess) {
      clearTracking();
      handleComplete && handleComplete();
      disable();
    }
    if (result.isError) {
      if (result.error.status === 400) {
        Alert.alert("유효하지 않은 데이터입니다.");
      } else if (result.error.status === 404) {
        Alert.alert("존재하지 않는 디바이스입니다.");
      }
    }
  }, [result]);

  const body = () => {
    const obj: { [key: string]: any } = {};
    obj[`safety_zone_${id}_name`] = name;
    obj[`safety_zone_${id}_coordinate`] = {
      type: "point",
      coordinates: [
        currentCamera?.center.latitude,
        currentCamera?.center.longitude,
      ],
    };
    obj[`safety_zone_${id}_radius`] = radiusValue;
    return obj;
  };

  const handleSubmit = () => {
    handleComplete();
    // if (disabled || result.isLoading) return;
    // updateSafetyZone({ deviceId, body: body() });
  };

  return (
    <Container behavior="height">
      <Map
        style={{ flex: 1, position: "relative" }}
        initialCamera={currentCamera || camera}
        onLayout={e => {
          setBottomHeight(e.nativeEvent.layout.height);
        }}
        onRegionChangeComplete={async () => {
          const lastCamera = await mapRef.current?.getCamera();
          if (lastCamera) {
            setCurrentCamera(lastCamera);
          }
        }}>
        {currentCamera && radiusValue && (
          <Circle
            ref={circleRef}
            center={{
              latitude: currentCamera.center.latitude,
              longitude: currentCamera.center.longitude,
            }}
            radius={radiusValue}
            fillColor="rgba(83, 135, 188, 0.2)"
            strokeColor="rgba(83, 135, 188, 0.5)"
            strokeWidth={2}
          />
        )}
      </Map>
      <ShadowContainer
        style={{
          position: "absolute",
          top: bottomHeight / 2,
          left: "50%",
          marginLeft: -11,
          marginTop: isAndroid ? -11 : 12,
        }}>
        <OuterMarker>
          <InnerMarker />
        </OuterMarker>
      </ShadowContainer>
      <ShadowContainer>
        <BottomContainer>
          <InputWrapper>
            <InputContainer>
              <Input
                placeholder="안심존 이름"
                value={name}
                onChangeText={text => setName(text)}
              />
            </InputContainer>
            <InputContainer style={{ marginLeft: 12 }}>
              <Input
                isEditable={false}
                value={radius}
                onPress={() => {
                  showActionSheetWithOptions(
                    {
                      options,
                      cancelButtonIndex,
                      destructiveButtonIndex,
                      userInterfaceStyle: "light",
                    },
                    buttonIndex => {
                      if (buttonIndex !== 5) {
                        setRadius(options[buttonIndex]);
                      }
                    },
                  );
                }}
                placeholder="안심존 반경"
              />
            </InputContainer>
          </InputWrapper>
          <Button
            disabled={/* !name || !radiusValue */ false}
            style={{ marginBottom: show ? 0 : isIos ? 24 : 48 }}
            isLoading={result.isLoading}
            onPress={handleSubmit}
            text="완료"
          />
        </BottomContainer>
      </ShadowContainer>
      <ShadowContainer
        style={{
          position: "absolute",
          top: bottomHeight - 72,
          right: 24,
        }}>
        <MyLocationCircle
          onPress={() => {
            if (isTracking) {
              setIsCameraMoved(false);
            } else {
              startTracking();
            }
          }}>
          <MyLocation />
        </MyLocationCircle>
      </ShadowContainer>
    </Container>
  );
};

export default SafetyZoneMap;
