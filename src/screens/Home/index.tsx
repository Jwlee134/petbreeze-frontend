import React from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";
import { useEffect } from "react";
import { Linking, StyleSheet } from "react-native";

const Container = styled.View`
  flex: 1;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { notification } = useAppSelector(state => state.common);
  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();

  const handleOpenUrl = ({ url }: { url: string }) => {
    if (url === "petbreeze://walk/map") {
      navigation.navigate("Walk");
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url === "petbreeze://walk/map") {
        navigation.navigate("Walk");
      }
    });
    Linking.addEventListener("url", handleOpenUrl);
    return () => {
      Linking.removeEventListener("url", handleOpenUrl);
    };
  }, []);

  return (
    <Container>
      <Map style={StyleSheet.absoluteFill} />
    </Container>
  );
};

export default Home;
