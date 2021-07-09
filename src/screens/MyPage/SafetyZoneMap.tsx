import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";
import useMap from "~/hooks/useMap";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { Alert, Dimensions, Keyboard, Platform } from "react-native";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import useAnimatedList from "~/hooks/useAnimatedList";
import { useDispatch } from "react-redux";
import Input from "~/components/common/InputLegacy";
import Octicons from "react-native-vector-icons/Octicons";
import { Camera, Circle } from "react-native-maps";
import { storageActions } from "~/store/storage";
import { safetyZoneData } from "~/staticData";
import { get4PointsAroundCircumference } from "~/utils";
import {
  SafetyZoneMapScreenNavigationProp,
  SafetyZoneMapScreenRouteProp,
} from "~/types/navigator";

const Container = styled.View`
  flex: 1;
`;

const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 20px 25px 0px 25px;
  justify-content: space-between;
  width: 100%;
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

const SafetyZoneMap = ({
  route,
  navigation,
}: {
  route: SafetyZoneMapScreenRouteProp;
  navigation: SafetyZoneMapScreenNavigationProp;
}) => {
  const { Map, mapRef, camera } = useMap();
  const { isOpened, setIsOpened, IconContainer, ListContainer } =
    useAnimatedList();
  const dispatch = useDispatch();
  const circleRef = useRef<Circle>(null);

  const [currentId, setCurrentId] = useState(0);
  const [name, setName] = useState("");
  const [range, setRange] = useState({ label: "", value: 0 });
  const [currentCamera, setCurrentCamera] = useState<Camera | null>(null);

  const dismiss = () => {
    Keyboard.dismiss();
    if (isOpened) setIsOpened(false);
  };

  const handleFinish = useCallback(() => {
    if (!name || !range.value) {
      return Alert.alert("필수 항목이 누락되었습니다.");
    }
    if (currentCamera) {
      dispatch(
        storageActions.updateSafetyZone({
          id: currentId,
          camera: currentCamera,
          name,
          distanceLabel: range.label,
          distanceValue: range.value,
        }),
      );
      navigation.goBack();
    }
  }, [currentCamera, name, range]);

  useLayoutEffect(() => {
    if (!route.params) return;
    const { id, name, camera, range } = route.params;
    setCurrentId(id);
    setName(name);
    setCurrentCamera(camera);
    setRange(range);
  }, [route.params]);

  return (
    <Container>
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
                setRange({ label: item.label, value: item.value });
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
        initialCamera={currentCamera || camera}
        onRegionChangeComplete={async () => {
          const lastCamera = await mapRef.current?.getCamera();
          if (lastCamera) {
            setCurrentCamera(lastCamera);
          }
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
    </Container>
  );
};

export default SafetyZoneMap;
