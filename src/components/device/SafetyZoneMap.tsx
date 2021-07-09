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
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";

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

const SafetyZoneMap = ({ handleNext }: { handleNext?: () => void }) => {
  const { Map, mapRef, camera } = useMap();
  const { isTracking, startTracking } = useMyLocation();
  const { latitude, longitude } = useAppSelector(state => state.map.myCoords);
  const { showActionSheetWithOptions } = useActionSheet();
  const circleRef = useRef<Circle>(null);
  const dispatch = useDispatch();

  const [bottomHeight, setBottomHeight] = useState(0);
  const [isCameraMoved, setIsCameraMoved] = useState(false);
  const [name, setName] = useState("");
  const [radius, setRadius] = useState("");
  const [currentCamera, setCurrentCamera] = useState<Camera | null>(null);

  const radiusValue =
    Number(radius.replace(/\D/g, "")) === 1
      ? 1000
      : Number(radius.replace(/\D/g, ""));

  const coordsArr = useMemo(() => {
    if (currentCamera) {
      return get4PointsAroundCircumference(
        currentCamera.center.latitude,
        currentCamera.center.longitude,
        radiusValue,
      );
    }
  }, [radiusValue]);

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
            onPress={() => {
              handleNext && handleNext();
            }}
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
