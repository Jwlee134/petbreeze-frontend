import { useCallback, useEffect, useRef, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";

import BleManager, { Peripheral } from "react-native-ble-manager";

import deviceApi from "~/api/device";
import { bytesToString, stringToBytes, isAndroid, isIos } from "~/utils";

import FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { store, useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { bleActions } from "~/store/ble";
import { formActions } from "~/store/form";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const interval = 512;

const SafetyZone = {
  UUID: "C4A28FCC-DD6E-11EB-BA80-0242AC130004",
  CharacteristicArea: "C4A21988-DD6E-11EB-BA80-0242AC130004",
  CharacteristicWifi: "C4A2577E-DD6E-11EB-BA80-0242AC130004",
};

const OTAControlPoint = {
  UUID: "c4a10060-dd6e-11eb-ba80-0242ac130004",
  CharacteristicNotif: "c4a10146-dd6e-11eb-ba80-0242ac130004",
  CharacteristicFirmware: "c4a1020e-dd6e-11eb-ba80-0242ac130004",
};

const DeviceInformation = {
  UUID: "c4a0fbce-dd6e-11eb-ba80-0242ac130004",
  CharacteristicA: "c4a0fdf4-dd6e-11eb-ba80-0242ac130004",
};

const useBleMaganer = () => {
  const status = useAppSelector(state => state.ble.status);
  const isOtaUpdate = useAppSelector(state => state.ble.isOtaUpdate);
  const disconnected = useAppSelector(state => state.ble.disconnected);
  const dispatch = useDispatch();

  const [peripheral, setPeripheral] = useState<Peripheral | null>(null);
  const [firmware, setFirmware] = useState<number[]>([]);
  const timeout = useRef<NodeJS.Timeout>();

  const [registerDevice, { data, error }] = deviceApi.usePostDeviceMutation();
  const [getProfile, { data: profile }] =
    deviceApi.useLazyGetDeviceProfileQuery();

  const startNotification = async (type: "WiFi" | "OTA") => {
    try {
      await BleManager.startNotification(
        (peripheral as Peripheral).id,
        type === "OTA" ? OTAControlPoint.UUID : SafetyZone.UUID,
        type === "OTA"
          ? OTAControlPoint.CharacteristicNotif
          : SafetyZone.CharacteristicWifi,
      );
      console.log("Succeded to start notification: ", peripheral?.id);
    } catch (error) {
      console.warn("Failed to start notification: ", error);
      dispatch(bleActions.setStatus("startNotificationFail"));
    }
  };

  const stopNotification = async (type: "WiFi" | "OTA") => {
    try {
      await BleManager.stopNotification(
        (peripheral as Peripheral).id,
        type === "OTA" ? OTAControlPoint.UUID : SafetyZone.UUID,
        type === "OTA"
          ? OTAControlPoint.CharacteristicNotif
          : SafetyZone.CharacteristicWifi,
      );
      console.log("Succeeded to stop notification");
    } catch (error) {
      console.warn("Failed to stop notification: ", error);
    }
  };

  const sendSafetyZone = useCallback(async () => {
    if (disconnected) {
      dispatch(bleActions.setStatus("safetyZoneDone"));
      return;
    }
    const {
      coord: { latitude, longitude },
      radius,
    } = store.getState().deviceSetting.safetyZone.draft;
    const obj: { [key: string]: number[] } = {};
    obj["Area0"] = [latitude, longitude, radius];
    console.log(obj, stringToBytes(JSON.stringify(obj)));
    try {
      await BleManager.write(
        (peripheral as Peripheral).id,
        SafetyZone.UUID,
        SafetyZone.CharacteristicArea,
        stringToBytes(JSON.stringify(obj)),
        512,
      );
    } finally {
      dispatch(bleActions.setStatus("safetyZoneDone"));
    }
  }, [status]);

  const sendWifi = useCallback(async () => {
    if (disconnected) return;
    const { ssid, pw } = store.getState().deviceSetting.wifi.draft;
    const obj: { WiFi0: { [key: string]: string } } = {
      WiFi0: {},
    };
    obj.WiFi0[ssid] = pw;
    console.log(obj, stringToBytes(JSON.stringify(obj)));
    try {
      await BleManager.write(
        (peripheral as Peripheral).id,
        SafetyZone.UUID,
        SafetyZone.CharacteristicWifi,
        stringToBytes(JSON.stringify(obj)),
        512,
      );
      setTimeout(() => {
        startNotification("WiFi");
      }, 500);
    } catch (error) {
      dispatch(bleActions.setStatus("wifiFail"));
    }
  }, [status]);

  const installFirmware = useCallback(async () => {
    if (!firmware) return;
    try {
      for (let i = 0; i < Math.floor(firmware.length / interval); i++) {
        const data = firmware.slice(i * interval, (i + 1) * interval);
        dispatch(
          bleActions.setProgress(
            Math.round(((interval * i) / firmware.length) * 100),
          ),
        );
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicFirmware,
          firmware.slice(i * interval, (i + 1) * interval),
          512,
        );
        console.log(`count: ${i}`, data, data.length);
      }
      if (firmware.length % interval !== 0) {
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicFirmware,
          firmware.slice(-(firmware.length % interval)),
          512,
        );
        console.log(firmware.slice(-(firmware.length % interval)));
      }
      dispatch(bleActions.setStatus("otaUpdateSuccess"));
    } catch (error) {
      console.warn("Failed to send firmware: ", error);
      dispatch(bleActions.setStatus("installingFail"));
    } finally {
      dispatch(bleActions.setProgress(0));
      setFirmware([]);
    }
  }, [status]);

  useEffect(() => {
    if (firmware.length) {
      console.log("Firmware download has completed.");
      setTimeout(() => {
        dispatch(bleActions.setProgress(0.001));
        dispatch(bleActions.setStatus("installingFirmware"));
      }, 1000);
    }
  }, [firmware]);

  const downloadFirmware = useCallback(async () => {
    const downloadResumable = new FileSystem.DownloadResumable(
      `https://next-bnb-jw.s3.ap-northeast-2.amazonaws.com/Release.bin`,
      `${FileSystem.cacheDirectory}Release.bin`,
      {},
      downloadProgress => {
        const progress = Math.floor(
          (downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite) *
            100,
        );
        dispatch(bleActions.setProgress(progress));
      },
    );
    try {
      const value = await downloadResumable.downloadAsync();
      if (value) {
        setTimeout(async () => {
          const data = await FileSystem.readAsStringAsync(value.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const firmware = Object.values(new Uint8Array(decode(data)));
          setFirmware(firmware);
        }, 500);
      }
    } catch (error) {
      dispatch(bleActions.setProgress(0));
      dispatch(bleActions.setStatus("downloadingFail"));
    }
  }, [status]);

  useEffect(() => {
    if (profile) {
      const { name, profile_image, birthdate, sex, species } = profile;
      dispatch(
        formActions.setState({
          name,
          photos: [profile_image],
          birthYear: new Date(birthdate).getFullYear(),
          sex,
          species,
        }),
      );
      dispatch(bleActions.setStatus("relationAdded"));
    }
  }, [profile]);

  useEffect(() => {
    const handleDevEUIResult = async () => {
      console.log(data, error);
      if (data) {
        const {
          data: { device_id },
        } = data;
        dispatch(bleActions.setDeviceID(device_id));
        if (data.status === 200) {
          getProfile(device_id);
        } else {
          await startNotification("OTA");
        }
      }
      if (error && "status" in error && error.status === 400) {
        dispatch(bleActions.setStatus("devEUIFail"));
      }
    };
    handleDevEUIResult();
  }, [data, error]);

  const handleReadDevEUI = useCallback(async () => {
    try {
      const devEUI = await BleManager.read(
        (peripheral as Peripheral).id,
        DeviceInformation.UUID,
        DeviceInformation.CharacteristicA,
      );
      console.log("Succeded to read devEUI: ", bytesToString(devEUI));
      registerDevice(bytesToString(devEUI));
    } catch (error) {
      console.warn("Failed to read devEUI", error);
      dispatch(bleActions.setStatus("retrieveFail"));
    }
  }, [status]);

  const getPeripheralData = useCallback(async () => {
    try {
      const data = await BleManager.retrieveServices(
        (peripheral as Peripheral).id,
      );
      console.log("Succeeded to retrieve data: ", data);
      dispatch(bleActions.setStatus("retrieveSuccess"));
    } catch (error) {
      console.warn("Failed to retrieve data: ", error);
      dispatch(bleActions.setStatus("retrieveFail"));
    }
  }, [status]);

  const handleConnect = async (peripheral: Peripheral) => {
    console.log(peripheral);
    try {
      await BleManager.connect(peripheral.id);
      setPeripheral(peripheral);
      console.log("Connected to: ", peripheral.id);
      dispatch(bleActions.setDisconnected(false));
      if (isAndroid) {
        await BleManager.requestMTU(peripheral.id, 515);
      }
      dispatch(bleActions.setStatus("connected"));
    } catch (error) {
      console.warn("Failed to connect: ", error);
      dispatch(bleActions.setStatus("connectingFail"));
    }
  };

  const handleDiscoverPeripheral = async (peripheral: Peripheral) => {
    if (
      !peripheral ||
      !peripheral.name ||
      !peripheral.name.includes(isIos ? "ESP" : "EODIGAE")
    ) {
      return;
    }
    await BleManager.stopScan();
    if (timeout.current) clearTimeout(timeout.current);
    handleConnect(peripheral);
  };

  const scanPeripheral = useCallback(() => {
    BleManager.scan([], 10, false);
    timeout.current = setTimeout(async () => {
      if (!peripheral) {
        await BleManager.stopScan();
        dispatch(bleActions.setStatus("scanningFail"));
      }
    }, 10000);
  }, [status]);

  const handleNotificationResponse = ({
    value,
    peripheral,
    characteristic,
  }: any) => {
    console.log("Notification has been arrived: ", value, characteristic);
    if (
      characteristic.toLowerCase() ===
      SafetyZone.CharacteristicWifi.toLowerCase()
    ) {
      console.log("wifi notification: ", value);
      if (value[0] === 79) {
        dispatch(bleActions.setStatus("wifiSuccess"));
      } else {
        dispatch(bleActions.setStatus("wifiFail"));
      }
    } else {
      if (value[0] === 79) {
        dispatch(bleActions.setStatus("downloadingFirmware"));
      } else {
        dispatch(bleActions.setStatus("notificationFail"));
      }
    }
  };

  useEffect(() => {
    const disconnect = bleManagerEmitter.addListener(
      "BleManagerDisconnectPeripheral",
      ({ peripheral: disconnectedPeripheral }) => {
        if (disconnectedPeripheral === peripheral?.id) {
          dispatch(bleActions.setDisconnected(true));
        }
      },
    );
    return () => {
      disconnect.remove();
    };
  }, [peripheral]);

  useEffect(() => {
    console.log("isDisconnected: ", disconnected);
  }, [disconnected]);

  useEffect(() => {
    console.log(status);
    if (status === "scanning") {
      scanPeripheral();
    }
    if (status === "connected") {
      setTimeout(() => {
        getPeripheralData();
      }, 1700);
    }
    if (status === "retrieveSuccess") {
      if (isOtaUpdate) {
        startNotification("OTA");
      } else {
        handleReadDevEUI();
      }
    }
    if (status === "downloadingFirmware") {
      downloadFirmware();
    }
    if (status === "installingFirmware") {
      installFirmware();
    }
    if (status === "otaUpdateSuccess") {
      setTimeout(() => {
        stopNotification("OTA");
      }, 500);
    }
    if (status === "connectingToWifi") {
      sendWifi();
    }
    if (status === "sendingSafetyZone") {
      sendSafetyZone();
    }
  }, [status]);

  useEffect(() => {
    const discover = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral,
    );
    const notification = bleManagerEmitter.addListener(
      "BleManagerDidUpdateValueForCharacteristic",
      handleNotificationResponse,
    );

    return () => {
      discover.remove();
      notification.remove();
    };
  }, []);
};

export default useBleMaganer;
