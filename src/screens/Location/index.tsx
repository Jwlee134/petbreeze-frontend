import React, { useEffect } from "react";
import {
  Linking,
  NativeEventEmitter,
  NativeModules,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LocationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";
import Modal from "react-native-modal";

import BleManager from "react-native-ble-manager";
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

  const handleOpenSetting = () => {
    Platform.OS === "ios"
      ? Linking.openURL("App-Prefs:Bluetooth")
      : AndroidOpenSettings.bluetoothSettings();
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
    <>
      <SafeAreaContainer>
        <CustomHeader
          size="small"
          RightIcon={() => (
            <Ionicons
              name="information-circle-outline"
              size={26}
              onPress={open}
            />
          )}>
          어디개
        </CustomHeader>
        <TouchableOpacity onPress={handleOpenSetting}>
          <Text style={{ fontSize: 40 }}>Open bluetooth setting</Text>
        </TouchableOpacity>
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
