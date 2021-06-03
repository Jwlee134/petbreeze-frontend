import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  NativeEventEmitter,
  NativeModules,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LocationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";
import Modal from "react-native-modal";

import BleManager, { start } from "react-native-ble-manager";
import AndroidOpenSettings from "react-native-android-open-settings";
import CustomHeader from "~/components/common/CustomHeader";
import useModal from "~/hooks/useModal";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import CautionModal from "~/components/modal/locationModal/CautionModal";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Container = styled.View``;

const Location = ({
  navigation,
}: {
  navigation: LocationScreenNavigationProp;
}) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState<any[]>([]);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 3, true)
        .then(results => {
          console.log("Scanning...");
          setIsScanning(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleStopScan = () => {
    console.log("Scan is stopped");
    setIsScanning(false);
  };

  const handleDiscoverPeripheral = (peripheral: any) => {
    console.log("Got ble peripheral", peripheral);
    if (!peripheral.name) {
      peripheral.name = "NO NAME";
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  const handleOpenSetting = () => {
    Platform.OS === "ios"
      ? Linking.openURL("App-Prefs:Bluetooth")
      : AndroidOpenSettings.bluetoothSettings();
  };

  /* const getPeripheral = (peripheral: any) => {
    console.log(peripheral);
  }; */

  useEffect(() => {
    BleManager.start({ showAlert: false }).then(() => {
      console.log("Initialized");
      // 최초 페어링을 할 시 기기의 시리얼 넘버를 받아오기 위함
    });

    /* bleManagerEmitter.addListener("BleManagerConnectPeripheral", getPeripheral); */
    bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener("BleManagerStopScan", handleStopScan);

    return () => {
      /* bleManagerEmitter.removeListener(
        "BleManagerConnectPeripheral",
        getPeripheral,
      ); */
      bleManagerEmitter.removeListener(
        "BlemanagerDiscoverPeripheral",
        handleDiscoverPeripheral,
      );
      bleManagerEmitter.removeListener("BleManagerStopScan", handleStopScan);
    };
  }, []);

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      <SafeAreaContainer>
        <CustomHeader
          size="small"
          RightIcon={() => (
            <Ionicons name="information-circle-outline" size={26} />
          )}
          RightIconOnPress={open}>
          어디개
        </CustomHeader>
        <TouchableOpacity onPress={handleOpenSetting}>
          <Text style={{ fontSize: 40 }}>Open bluetooth setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={startScan}>
          <Text>Start Scanning</Text>
        </TouchableOpacity>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text>{item.name}</Text>
              <Text>RSSI: {item.rssi}</Text>
              <Text>{item.id}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaContainer>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="주의사항">
          <CautionModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default Location;
