import React from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { HomeScreenNavigationProp } from "~/types/navigator";

import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import CustomHeader from "~/components/common/CustomHeader";

import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import CautionModal from "~/components/modal/locationModal/CautionModal";

import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useLocationTracking from "~/hooks/useLocationTracking";
import HomeToggle from "~/components/map/HomeToggle";
import OrangeCircleMarker from "~/components/map/OrangeCircleMarker";

const Container = styled.View`
  flex: 1;
`;

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

  const { Map, mapRef } = useMap();

  const { isTracking, latitude, longitude, startTracking, clearTracking } =
    useLocationTracking({ mapRef });

  return (
    <>
      <SafeAreaContainer>
        <CustomHeader
          size="big"
          RightIcon={() => (
            <Ionicons name="information-circle-outline" size={26} />
          )}
          RightIconOnPress={open}>
          어디개
        </CustomHeader>
        <Container>
          <Map>
            {isTracking && (
              <OrangeCircleMarker coordinate={{ latitude, longitude }} />
            )}
          </Map>
          <HomeToggle
            startTracking={startTracking}
            clearTracking={clearTracking}
          />
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
      </SafeAreaContainer>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="주의사항">
          <CautionModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default Home;
