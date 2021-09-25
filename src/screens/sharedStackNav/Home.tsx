import React, { useContext } from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";

import { StyleSheet } from "react-native";

import DeviceList from "~/components/home/DeviceList";
import MapFloatingCircle from "~/components/common/MapFloatingCircle";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <Container>
        <Map style={StyleSheet.absoluteFill} />
        <DeviceList />
        <MapFloatingCircle
          style={{
            marginBottom: rpWidth(157),
            alignSelf: "flex-end",
            marginRight: rpWidth(16),
          }}
        />
      </Container>
    </>
  );
};

export default Home;
