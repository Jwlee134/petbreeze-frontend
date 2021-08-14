import React from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";

import { Pressable, StyleSheet, View } from "react-native";
import DeviceAvatarCircle from "~/components/common/DeviceAvatarCircle";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";

import BLEAdvertiser from "react-native-ble-advertiser";
import { rpHeight, rpWidth, width } from "~/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IosStyleBottomModal from "~/components/modal/IosStyleBottomModal";
import HomeBottomModal from "~/components/modal/HomeBottomModal";

const Container = styled.View`
  flex: 1;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { notification } = useAppSelector(state => state.common);
  const deviceList = useAppSelector(state => state.device);
  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();
  const { open, close, modalProps } = useModal({ type: "bottom" });
  const [clickedId, setClickedId] = useState("");

  const device = useMemo(() => {
    return deviceList[deviceList.findIndex(device => device.id === clickedId)];
  }, [clickedId]);

  const { bottom } = useSafeAreaInsets();

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
        {deviceList.map(device => (
          <Pressable
            key={device.id}
            onLongPress={() => {
              setClickedId(device.id);
              open();
            }}>
            <DeviceAvatarCircle
              battery={device.battery}
              avatar={device.avatarUrl}
            />
          </Pressable>
        ))}
      </Container>
      <Modal {...modalProps}>
        <IosStyleBottomModal close={close}>
          <HomeBottomModal device={device} />
        </IosStyleBottomModal>
      </Modal>
    </>
  );
};

export default Home;
