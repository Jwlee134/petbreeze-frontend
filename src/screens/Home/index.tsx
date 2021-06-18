import React from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";

import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import CautionModal from "~/components/modal/locationModal/CautionModal";

import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useLocationTracking from "~/hooks/useLocationTracking";
import HomeToggle from "~/components/map/HomeToggle";
import DeviceAvatarCircle from "~/components/map/DeviceAvatarCircle";

import HomeMap from "~/components/map/HomeMap";

const Container = styled.View``;

const Notification = styled.TouchableOpacity`
  background-color: rgba(110, 65, 226, 0.58);
  position: absolute;
  bottom: 24px;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const NotificationText = styled.Text`
  font-size: 16px;
  color: white;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { isDeviceRegistered, isLoggedIn } = useAppSelector(
    state => state.user,
  );
  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });
  const { Map, mapRef, camera } = useMap();
  const { isTracking, startTracking, clearTracking } = useLocationTracking();

  return (
    <>
      <Container>
        <HomeMap
          Map={Map}
          mapRef={mapRef}
          camera={camera}
          isTracking={isTracking}
        />
        {/* <HomeToggle
          startTracking={startTracking}
          clearTracking={clearTracking}
          mapRef={mapRef}
        /> */}
        <DeviceAvatarCircle />
      </Container>
      {!isDeviceRegistered && (
        <Notification
          activeOpacity={1}
          onPress={() =>
            navigation.navigate(!isLoggedIn ? "AuthSelector" : "AddDevice")
          }>
          <NotificationText>기기를 등록해주세요.</NotificationText>
        </Notification>
      )}
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="주의사항">
          <CautionModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default Home;
