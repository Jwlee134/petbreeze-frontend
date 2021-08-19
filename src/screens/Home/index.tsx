import React from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";

import { StyleSheet } from "react-native";

import BLEAdvertiser from "react-native-ble-advertiser";
import DeviceList from "~/components/home/DeviceList";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { notification } = useAppSelector(state => state.common);

  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();

  /*   useEffect(() => {
    BLEAdvertiser.setCompanyId(0x02); // Your Company's Code
    BLEAdvertiser.broadcast(
      "e7111937-f9c1-4fb6-b6ee-ae9f255a7f46",
      [255, 255, 255, 255],
      {
        txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_HIGH,
      },
    ) // The service UUID and additional manufacturer data.
      .then(success => console.log("Broadcasting Sucessful", success))
      .catch(error => console.log("Broadcasting Error", error));
  }, []); */

  return (
    <>
      <Container>
        <Map style={StyleSheet.absoluteFill} />
        <DeviceList />
      </Container>
    </>
  );
};

export default Home;
