import React from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";

import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import CautionModal from "~/components/modal/locationModal/CautionModal";

import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";
import HomeToggle from "~/components/map/HomeToggle";
import DeviceAvatarCircle from "~/components/map/DeviceAvatarCircle";

import HomeMap from "~/components/map/HomeMap";
import { useEffect } from "react";

import "~/NotificationHandler";
import { Linking } from "react-native";

const Container = styled.View`
  flex: 1;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { notification } = useAppSelector(state => state.common);
  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });
  const { Map, mapRef, camera } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();

  useEffect(() => {
    if (notification.includes("안심존")) {
      setTimeout(() => {
        navigation.navigate("Walk");
      }, 1);
    }
  }, [notification]);

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url === "petbreeze://walk/map") {
        navigation.navigate("Walk");
      }
    });
  }, []);

  return (
    <>
      <Container>
        <HomeMap
          Map={Map}
          mapRef={mapRef}
          camera={camera}
          isTracking={isTracking}
        />
        <HomeToggle
          isTracking={isTracking}
          startTracking={startTracking}
          clearTracking={clearTracking}
          mapRef={mapRef}
        />
      </Container>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="주의사항">
          <CautionModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default Home;
