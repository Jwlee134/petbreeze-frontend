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
import { useLayoutEffect } from "react";
import HeaderRightButton from "~/components/common/button/HeaderRightButton";
import { useEffect } from "react";

const Container = styled.View`
  flex: 1;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { notification } = useAppSelector(state => state.common);
  const { isLoggedIn } = useAppSelector(state => state.storage.user);
  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });
  const { Map, mapRef, camera } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton open={open} />,
    });
  }, []);

  useEffect(() => {
    if (notification.includes("안심존")) {
      setTimeout(() => {
        navigation.navigate("Walk");
      }, 1);
    }
  }, [notification]);

  return (
    <>
      <Container>
        <HomeMap
          Map={Map}
          mapRef={mapRef}
          camera={camera}
          isTracking={isTracking}
        />
        {/*  <HomeToggle
          startTracking={startTracking}
          clearTracking={clearTracking}
          mapRef={mapRef}
        /> */}
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
