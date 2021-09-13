import React from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";

import { StyleSheet } from "react-native";

import DeviceList from "~/components/home/DeviceList";
import MapFloatingCircle from "~/components/common/MapFloatingCircle";
import { rpWidth } from "~/styles";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const CircleContainer = styled.View`
  width: ${rpWidth(80)}px;
  align-self: flex-end;
  margin-bottom: ${rpWidth(48)}px;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();

  return (
    <>
      <Container>
        <Map style={StyleSheet.absoluteFill} />
        <DeviceList />
        <CircleContainer>
          <MapFloatingCircle
            style={{ alignSelf: "center", marginBottom: rpWidth(25) }}
          />
          <MapFloatingCircle style={{ alignSelf: "center" }} />
        </CircleContainer>
      </Container>
    </>
  );
};

export default Home;
