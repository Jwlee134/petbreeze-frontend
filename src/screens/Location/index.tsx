import React, { useEffect } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { LocationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";

import BleManager from "react-native-ble-manager";
import AndroidOpenSettings from "react-native-android-open-settings";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Container = styled.View``;

const Location = ({
  navigation,
}: {
  navigation: LocationScreenNavigationProp;
}) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  const handleOpenSetting = () => {
    AndroidOpenSettings.bluetoothSettings();
  };

  const getPeripheral = (peripheral: any) => {
    console.log(peripheral);
  };

  useEffect(() => {
    BleManager.start({ showAlert: false }).then(() => {
      console.log("Initialized");
      // 최초 페어링을 할 시 기기의 시리얼 넘버를 받아오기 위함
      bleManagerEmitter.addListener(
        "BleManagerConnectPeripheral",
        getPeripheral,
      );
    });

    return () =>
      bleManagerEmitter.removeListener(
        "BleManagerConnectPeripheral",
        getPeripheral,
      );
  }, []);

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <Container>
      <Text>Location</Text>
      <TouchableOpacity onPress={handleOpenSetting}>
        <Text style={{ fontSize: 40 }}>Open bluetooth setting</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Location;
