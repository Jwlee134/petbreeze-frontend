import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components/native";
import { SafetyZoneScreenNavigationProp } from "~/types/navigator";
import HelpCircle from "~/assets/svg/help-circle.svg";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SafetyZoneModal from "~/components/modal/SafetyZoneModal";
import { useState } from "react";
import useMap from "~/hooks/useMap";
import palette from "~/styles/palette";
import { Dimensions, Keyboard, Platform } from "react-native";

import Octicons from "react-native-vector-icons/Octicons";
import Input from "~/components/common/Input";
import useAnimatedList from "~/hooks/useAnimatedList";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import { Camera, Circle } from "react-native-maps";
import { useEffect } from "react";
import { get4PointsAroundCircumference } from "~/utils";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import SafetyZone from "~/components/myPage/SafetyZone";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import { safetyZoneData } from "~/staticData";
import { useMemo } from "react";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-right: 25px;
`;

const Text = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 100px 0px;
`;

const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 20px 25px 0px 25px;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  z-index: 100;
`;

const GrowContainer = styled.View`
  width: ${Dimensions.get("screen").width / 2 - 33}px;
`;

const Title = styled.Text`
  font-size: 14px;
  height: 20px;
`;

const BorderBottom = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${palette.gray_b4};
`;

const List = styled.TouchableHighlight`
  padding: 16px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ListLabel = styled.Text``;

const FakeMarker = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: teal;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -7.5px;
  margin-top: 41px;
`;

const edgePadding = Platform.OS === "ios" ? 75 : 100;

const SafetyZoneSetting = ({
  navigation,
}: {
  navigation: SafetyZoneScreenNavigationProp;
}) => {
  const safetyZone = useAppSelector(state => state.storage.safetyZone);
  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={open} activeOpacity={0.5}>
          <HelpCircle />
        </Button>
      ),
    });
  }, [navigation, open]);

  const [currentId, setCurrentId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [range, setRange] = useState({ label: "", value: 0 });
  const [currentCamera, setCurrentCamera] = useState<Camera | null>(null);

  const circleRef = useRef<Circle>(null);
  const { Map, mapRef, camera } = useMap();
  const { isOpened, setIsOpened, IconContainer, ListContainer } =
    useAnimatedList();

  const dismiss = () => {
    Keyboard.dismiss();
    if (isOpened) setIsOpened(false);
  };

  const initState = () => {
    setCurrentId(0);
    setName("");
    setRange({ label: "", value: 0 });
    setCurrentCamera(null);
  };

  const coordsArr = useMemo(() => {
    if (currentCamera) {
      return get4PointsAroundCircumference(
        currentCamera?.center.latitude,
        currentCamera?.center.longitude,
        range.value,
      );
    }
  }, [range.value]);

  useEffect(() => {
    if (!mapRef.current || !range.value) return;
    mapRef.current.fitToCoordinates(coordsArr, {
      edgePadding: {
        left: edgePadding,
        right: edgePadding,
        top: edgePadding,
        bottom: edgePadding,
      },
    });
  }, [mapRef, range.value]);

  useEffect(() => {
    if (
      !circleRef.current ||
      !editMode ||
      Platform.OS === "android" ||
      !range.value
    ) {
      return;
    }
    setTimeout(() => {
      circleRef.current?.setNativeProps({
        fillColor: "rgba(83, 135, 188, 0.1)",
        strokeColor: palette.blue_53,
        strokeWidth: 2,
      });
    }, 10);
  }, [circleRef, editMode, range.value]);

  return (
    <>
      {!editMode && safetyZone.length > 0 && (
        <SidePaddingContainer style={{ paddingTop: 25 }}>
          {safetyZone.map(item => (
            <SafetyZone
              key={item.id}
              item={item}
              handleEdit={() => {
                setCurrentId(item.id);
                setCurrentCamera(item.camera);
                setName(item.name);
                setRange({
                  label: item.distanceLabel,
                  value: item.distanceValue,
                });
                setEditMode(true);
              }}
            />
          ))}
        </SidePaddingContainer>
      )}
      <Container>
        {!editMode && safetyZone.length === 0 && (
          <Text>설정된 안심존이 없습니다.{"\n"}새로 설정하시겠습니까?</Text>
        )}
        {editMode && (
          <>
            <RowContainer activeOpacity={1} onPress={dismiss}>
              <GrowContainer style={{ marginRight: 16 }}>
                <Title>안심존 이름</Title>
                <Input
                  value={name}
                  onChangeText={text => setName(text)}
                  hasShadow={false}
                  isSafetyZone
                />
                <BorderBottom />
              </GrowContainer>
              <GrowContainer>
                <Title>안심존 반경</Title>
                <Input
                  hasShadow={false}
                  isSafetyZone
                  isInputEditable={false}
                  value={range.label}
                  onPress={() => {
                    Keyboard.dismiss();
                    setIsOpened(!isOpened);
                  }}
                  RightIcon={() => (
                    <IconContainer>
                      <Octicons
                        name="triangle-down"
                        size={18}
                        color={palette.gray_b4}
                      />
                    </IconContainer>
                  )}
                />
                <BorderBottom />
              </GrowContainer>
            </RowContainer>
            <ShadowContainer
              shadowContainerStyle={{
                position: "absolute",
                top: 78,
                right: 25,
              }}>
              <ListContainer
                style={{
                  width: Dimensions.get("screen").width / 2 - 33,
                }}>
                {safetyZoneData.map((item, index) => (
                  <List
                    onPress={() => {
                      setRange(item);
                      setIsOpened(false);
                    }}
                    underlayColor={palette.gray_f3}
                    key={index}>
                    <ListLabel>{item.label}</ListLabel>
                  </List>
                ))}
              </ListContainer>
            </ShadowContainer>
            <Map
              style={{
                zIndex: -100,
                marginTop: 20,
                flex: 1,
                position: "relative",
              }}
              onPress={dismiss}
              initialCamera={currentCamera ? currentCamera : camera}
              onRegionChangeComplete={async () => {
                const camera = await mapRef.current?.getCamera();
                if (camera) setCurrentCamera(camera);
              }}>
              {currentCamera && range.value && (
                <Circle
                  ref={circleRef}
                  center={{
                    latitude: currentCamera.center.latitude,
                    longitude: currentCamera.center.longitude,
                  }}
                  radius={range.value}
                  fillColor="rgba(83, 135, 188, 0.1)"
                  strokeColor={palette.blue_53}
                  strokeWidth={2}
                />
              )}
            </Map>
            <FakeMarker />
          </>
        )}
        {safetyZone.length < 4 && (
          <ConfirmButton
            style={{ position: "absolute", bottom: 25 }}
            disabled={editMode && (!name || !range.label)}
            onPress={() => {
              setEditMode(prev => !prev);
              if (editMode && currentCamera) {
                dispatch(
                  storageActions.updateSafetyZone({
                    id: currentId,
                    camera: currentCamera,
                    name,
                    distanceLabel: range.label,
                    distanceValue: range.value,
                  }),
                );
                initState();
              }
            }}>
            {editMode ? "저장" : "설정"}
          </ConfirmButton>
        )}
      </Container>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="안심존이란?">
          <SafetyZoneModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default SafetyZoneSetting;
