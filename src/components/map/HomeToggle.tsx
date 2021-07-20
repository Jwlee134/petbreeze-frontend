import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MapView from "react-native-maps";

import MyLocation from "~/assets/svg/myLocation.svg";
import MyLocationSelected from "~/assets/svg/myLocation-selected.svg";
import Path from "~/assets/svg/path.svg";
import PathSelected from "~/assets/svg/path-selected.svg";
import palette from "~/styles/palette";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { mapActions } from "~/store/map";
import { Platform } from "react-native";

interface IProps {
  isTracking: boolean;
  startTracking: () => void;
  clearTracking: () => void;
  mapRef: React.RefObject<MapView>;
}

const ButtonContainer = styled.TouchableOpacity`
  width: 65px;
  position: absolute;
  align-items: center;
  right: 10px;
`;

const Circle = styled.View<{ selected: boolean }>`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: ${({ selected }) => (selected ? palette.blue_6e : "white")};
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 7,
};

const HomeToggle = ({
  isTracking,
  startTracking,
  clearTracking,
  mapRef,
}: IProps) => {
  const data = useAppSelector(state => state.device);
  const {
    showPath,
    showMyLocation,
    myCoords: { latitude, longitude },
  } = useAppSelector(state => state.map);

  const dispatch = useDispatch();

  const edgePadding = Platform.OS === "android" ? 240 : 120;

  const [isCameraMoved, setIsCameraMoved] = useState(false);

  const selectedDevice = data.filter(device => device.selected)[0];

  useEffect(() => {
    if (!mapRef.current) return;
    if (latitude && longitude && !isCameraMoved) {
      mapRef.current.animateCamera({
        center: { latitude, longitude },
        zoom: 17,
      });
      setIsCameraMoved(true);
    }
  }, [mapRef, latitude, longitude, isCameraMoved]);

  useEffect(() => {
    if (showMyLocation && !isTracking) {
      startTracking();
    }
    if (!showMyLocation && isTracking) {
      dispatch(mapActions.initMyCoords());
      setIsCameraMoved(false);
      clearTracking();
    }
  }, [showMyLocation, isTracking]);

  useEffect(() => {
    if (!mapRef.current || !selectedDevice?.id) return;
    if (showPath) {
      mapRef.current.fitToCoordinates(
        selectedDevice.path.map(coordinate => ({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        })),
        {
          edgePadding: {
            top: edgePadding,
            left: edgePadding,
            right: edgePadding,
            bottom: edgePadding,
          },
        },
      );
    }
  }, [mapRef, showPath, selectedDevice?.id]);

  return (
    <>
      <ButtonContainer
        onPress={() => dispatch(mapActions.setShowPath(!showPath))}
        style={{
          top: 20,
        }}
        activeOpacity={1}>
        <Circle style={shadow} selected={showPath}>
          {showPath ? <PathSelected /> : <Path />}
        </Circle>
      </ButtonContainer>
      <ButtonContainer
        onPress={() => dispatch(mapActions.setShowMyLocation(!showMyLocation))}
        style={{ top: 85 }}
        activeOpacity={1}>
        <Circle style={shadow} selected={showMyLocation}>
          {showMyLocation ? <MyLocationSelected /> : <MyLocation />}
        </Circle>
      </ButtonContainer>
    </>
  );
};

export default HomeToggle;
