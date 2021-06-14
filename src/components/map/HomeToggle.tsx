import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MapView from "react-native-maps";

import Star from "~/assets/svg/star-outline.svg";
import DoubleCircle from "~/assets/svg/circle-double.svg";
import OrangeStar from "~/assets/svg/star-outline-orange.svg";
import OrangeDoubleCircle from "~/assets/svg/circle-double-orange.svg";
import palette from "~/styles/palette";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { mapActions } from "~/store/map";
import { Platform } from "react-native";

interface IProps {
  startTracking: () => void;
  clearTracking: () => void;
  mapRef: React.RefObject<MapView>;
  showPath: boolean;
  setShowPath: React.Dispatch<React.SetStateAction<boolean>>;
  showMyLocation: boolean;
  setShowMyLocation: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonContainer = styled.TouchableOpacity`
  width: 65px;
  position: absolute;
  align-items: center;
  right: 10px;
`;

const Circle = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: ${palette.blue_6e};
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${palette.blue_6e};
`;

const HomeToggle = ({
  startTracking,
  clearTracking,
  mapRef,
  showPath,
  setShowPath,
  showMyLocation,
  setShowMyLocation,
}: IProps) => {
  const { myLatitude, myLongitude, coordinates } = useAppSelector(
    state => state.map.home,
  );
  const dispatch = useDispatch();

  const [isCameraMoved, setIsCameraMoved] = useState(false);

  const edgePadding = Platform.OS === "android" ? 240 : 120;

  useEffect(() => {
    if (showMyLocation) {
      startTracking();
    } else {
      dispatch(mapActions.initMyCoords());
      setIsCameraMoved(false);
      clearTracking();
    }
  }, [showMyLocation]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (myLatitude && myLongitude && !isCameraMoved) {
      mapRef.current.animateCamera({
        center: { latitude: myLatitude, longitude: myLongitude },
        zoom: 17,
      });
      setIsCameraMoved(true);
    }
  }, [mapRef, myLatitude, myLongitude, isCameraMoved]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (showPath) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: edgePadding,
          left: edgePadding,
          right: edgePadding,
          bottom: edgePadding,
        },
      });
    }
  }, [mapRef, showPath]);

  return (
    <>
      <ButtonContainer
        onPress={() => setShowPath(prev => !prev)}
        style={{ top: 20 }}
        activeOpacity={0.7}>
        <Circle>{showPath ? <OrangeStar /> : <Star />}</Circle>
        <ButtonText>이동경로</ButtonText>
      </ButtonContainer>
      <ButtonContainer
        onPress={() => setShowMyLocation(prev => !prev)}
        style={{ top: 100 }}
        activeOpacity={0.8}>
        <Circle>
          {showMyLocation ? <OrangeDoubleCircle /> : <DoubleCircle />}
        </Circle>
        <ButtonText>내 위치</ButtonText>
      </ButtonContainer>
    </>
  );
};

export default HomeToggle;
