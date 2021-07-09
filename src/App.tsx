import React, { useState } from "react";
/* import { useEffect } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import BleManager, { Peripheral } from "react-native-ble-manager";
import { useRef } from "react";
import { bytesToString } from "convert-string";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule); */
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { lightTheme } from "./styles/theme";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./store";
import { Provider } from "react-redux";

import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import "./NotificationHandler";
import RootNav from "./navigator/RootNav";
import { StatusBar } from "react-native";

Settings.initializeSDK();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <NavigationContainer theme={lightTheme}>
        <SafeAreaProvider>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <ActionSheetProvider useNativeDriver>
            <RootNav />
          </ActionSheetProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

/* const OTAControlPoint = {
  UUID: "c4a10060-dd6e-11eb-ba80-0242ac130004",
  CharacteristicA: "c4a1020e-dd6e-11eb-ba80-0242ac130004",
  CharacteristicB: "c4a10146-dd6e-11eb-ba80-0242ac130004",
};

const App = () => {
  const [peripheral, setPeripheral] = useState<Peripheral | null>(null);
  const [value, setValue] = useState<number[]>([]);
  const [status, setStatus] = useState("");
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapRef = useRef<MapView>(null);

  const handleConnect = (peripheral: Peripheral) => {
    BleManager.connect(peripheral.id).then(() => {
      setStatus(`Connected to ${peripheral.name}`);
      BleManager.retrieveServices(peripheral.id).then(data => {
        console.log(data);
        BleManager.startNotification(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicA,
        );
      });
    });
  };

  useEffect(() => {
    if (!peripheral) return;
    handleConnect(peripheral);
  }, [peripheral]);

  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    if (
      !peripheral ||
      !peripheral.name ||
      !peripheral.name.includes("EODIGAE")
    ) {
      return;
    }
    console.log(peripheral);
    BleManager.stopScan().then(() => {
      setPeripheral(peripheral);
    });
  };

  useEffect(() => {
    BleManager.start({ showAlert: false });
    bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener(
      "BleManagerDidUpdateValueForCharacteristic",
      ({ value }) => {
        setValue(value);
      },
    );
  }, []);

  useEffect(() => {
    if (value) {
      const coordinates = bytesToString(value).split(",");
      setCoords({
        latitude: Number(coordinates[0]),
        longitude: Number(coordinates[1]),
      });
    }
  }, [value]);

  useEffect(() => {
    if (!mapRef.current || !coords.latitude || !coords.longitude) return;
    mapRef.current.animateCamera({
      center: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      zoom: 18,
    });
  }, [mapRef, coords.latitude, coords.longitude]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          BleManager.scan([], 10, false);
        }}>
        <Text>Start scanning</Text>
        <Text>{status}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{
            width: "100%",
            height: "100%",
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {coords.latitude && coords.longitude ? (
            <Marker
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
            />
          ) : null}
        </MapView>
      </View>
    </SafeAreaView>
  );
}; */

export default App;
