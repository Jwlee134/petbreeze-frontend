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
import Map from "~/components/map/Map";

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
        <Map isFullScreen isHome />
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
