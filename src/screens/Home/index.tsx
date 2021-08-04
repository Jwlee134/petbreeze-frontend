import React from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";

import "~/NotificationHandler";
import { Linking, StyleSheet } from "react-native";

const Container = styled.View`
  flex: 1;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { notification } = useAppSelector(state => state.common);
  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();

  /* useEffect(() => {
    if (notification.includes("안심존")) {
      setTimeout(() => {
        navigation.navigate("Walk");
      }, 1);
    }
  }, [notification]); */

  return (
    <Container>
      <Map style={StyleSheet.absoluteFill} />
    </Container>
  );
};

export default Home;
