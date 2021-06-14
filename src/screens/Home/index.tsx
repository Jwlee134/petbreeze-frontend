import React, { useState } from "react";
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

import data from "~/assets/deviceData.json";
import { MapEvent, Polyline } from "react-native-maps";
import palette from "~/styles/palette";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { mapActions } from "~/store/map";
import useReverseGeocoding from "~/hooks/useReverseGeocoding";

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
  const { myLatitude, myLongitude, coordinates } = useAppSelector(
    state => state.map.home,
  );

  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  const { Map, mapRef } = useMap();

  const { isTracking, startTracking, clearTracking } = useLocationTracking();

  const [showPath, setShowPath] = useState(false);
  const [showMyLocation, setShowMyLocation] = useState(false);

  const dispatch = useDispatch();

  const { getAddress } = useReverseGeocoding();

  const handleMarkerPress = async (
    e: MapEvent<{
      action: "marker-press";
      id: string;
    }>,
  ) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const address = await getAddress(latitude, longitude);
    if (address) console.log(address);
  };

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
              <Marker
                color="green"
                coordinate={{ latitude: myLatitude, longitude: myLongitude }}
              />
            )}
            {showPath && (
              <>
                <Polyline
                  coordinates={coordinates}
                  strokeWidth={2}
                  strokeColor={palette.blue_34}
                />
                {coordinates.map((data, index) => (
                  <Marker
                    key={index}
                    onPress={handleMarkerPress}
                    color={index !== coordinates.length - 1 ? "blue" : "red"}
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
            showPath={showPath}
            setShowPath={setShowPath}
            showMyLocation={showMyLocation}
            setShowMyLocation={setShowMyLocation}
            startTracking={startTracking}
            clearTracking={clearTracking}
            mapRef={mapRef}
          />
          <DeviceAvatarCircle devices={data} />
        </Container>
        <TouchableOpacity onPress={() => dispatch(mapActions.setCoordinates())}>
          <Text>asdfasdf</Text>
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
