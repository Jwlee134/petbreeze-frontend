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
import Marker from "~/components/map/Marker";
import DeviceAvatarCircle from "~/components/map/DeviceAvatarCircle";

import { Polyline } from "react-native-maps";
import palette from "~/styles/palette";
import useReverseGeocoding from "~/hooks/useReverseGeocoding";
import { TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { deviceActions } from "~/store/device";
import { storageActions } from "~/store/storage";

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
  const data = useAppSelector(state => state.device);
  const { isDeviceRegistered, isLoggedIn } = useAppSelector(
    state => state.user,
  );
  const { myLatitude, myLongitude, showPath } = useAppSelector(
    state => state.map,
  );

  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });
  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useLocationTracking();
  const { getAddress } = useReverseGeocoding();
  const dispatch = useDispatch();

  const selectedDevice = data.filter(device => device.selected)[0];

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
          <Map
            onRegionChangeComplete={async () => {
              if (!mapRef.current) return;
              const camera = await mapRef.current.getCamera();
              dispatch(storageActions.setCamera(camera));
            }}>
            {isTracking && (
              <Marker
                color="green"
                coordinate={{ latitude: myLatitude, longitude: myLongitude }}
              />
            )}
            {showPath && selectedDevice && (
              <>
                <Polyline
                  coordinates={selectedDevice.path.map(data => ({
                    latitude: data.latitude,
                    longitude: data.longitude,
                  }))}
                  strokeWidth={2}
                  strokeColor={palette.blue_34}
                />
                {selectedDevice.path.map((data, index) => (
                  <Marker
                    key={index}
                    onPress={async e => {
                      const { latitude, longitude } = e.nativeEvent.coordinate;
                      const address = await getAddress(latitude, longitude);
                      if (address)
                        console.log(
                          String(data.utc)
                            .substring(0, 4)
                            .replace(/\B(?=(\d{2})+(?!\d))/g, ":"),
                          address,
                        );
                    }}
                    color={
                      index !== selectedDevice.path.length - 1 ? "blue" : "red"
                    }
                    coordinate={{
                      latitude: data.latitude,
                      longitude: data.longitude,
                    }}
                  />
                ))}
              </>
            )}
          </Map>
          <HomeToggle
            startTracking={startTracking}
            clearTracking={clearTracking}
            mapRef={mapRef}
          />
          <DeviceAvatarCircle />
        </Container>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              deviceActions.setPath({
                id: selectedDevice.id,
                latitude: 37.480237,
                longitude: 126.951657,
                date: 210614,
                utc: 215523,
              }),
            );
          }}>
          <Text>ㅁㄴㅇㄹㅁㄴㅇㄹ</Text>
        </TouchableOpacity>
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
