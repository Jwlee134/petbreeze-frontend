import { useCallback, useEffect, useRef, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";

import BleManager, { Peripheral } from "react-native-ble-manager";

import deviceApi from "~/api/device";
import { bytesToString, isAndroid, isIos } from "~/utils";

import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { bleActions } from "~/store/ble";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const interval = 512;

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
  const dispatch = useDispatch();

  const [peripheral, setPeripheral] = useState<Peripheral | null>(null);
  const [firmware, setFirmware] = useState<number[]>([]);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [registerDevice, { data, error }] = deviceApi.usePostDeviceMutation();

  const startNotification = async () => {
    try {
      await BleManager.startNotification(
        (peripheral as Peripheral).id,
        OTAControlPoint.UUID,
        OTAControlPoint.CharacteristicNotif,
      );
      console.log("Succeded to start notification: ", peripheral?.id);
    } catch (error) {
      console.warn("Failed to start notification: ", error);
      dispatch(bleActions.setStatus("startNotificationFail"));
    }
  };

  const stopNotification = async () => {
    try {
      await BleManager.stopNotification(
        (peripheral as Peripheral).id,
        OTAControlPoint.UUID,
        OTAControlPoint.CharacteristicNotif,
      );
      console.log("Succeeded to stop notification");
    } catch (error) {
      console.warn("Failed to stop notification: ", error);
    }
  };

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
    const downloadResumable = FileSystem.createDownloadResumable(
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
    if (data) {
      dispatch(bleActions.setDeviceID(data.device_id));
      startNotification();
    }
    if (error && "status" in error && error.status === 400) {
      dispatch(bleActions.setStatus("devEUIFail"));
    }
  }, [data, error]);

  const handleReadDevEUI = useCallback(async () => {
    try {
      const devEUI = await BleManager.read(
        (peripheral as Peripheral).id,
        DeviceInformation.UUID,
        DeviceInformation.CharacteristicA,
      );
      console.log("Succeded to read devEUI: ", bytesToString(devEUI));
      registerDevice({ SIM_serial_number: bytesToString(devEUI) });
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
      if (isAndroid) {
        await BleManager.requestMTU((peripheral as Peripheral).id, 515);
      }
      dispatch(bleActions.setStatus("retrieveSuccess"));
    } catch (error) {
      console.warn("Failed to retrieve data: ", error);
      dispatch(bleActions.setStatus("retrieveFail"));
    }
  }, [status]);

  const handleConnect = async (peripheral: Peripheral) => {
    console.log(peripheral);
    try {
      timeout.current = setTimeout(async () => {
        await BleManager.stopScan();
        dispatch(bleActions.setStatus("scanningFail"));
      }, 10000);
      console.log("Connecting to: ", peripheral.id);
      await BleManager.connect(peripheral.id);
      clearTimeout(timeout.current);
      timeout.current = null;
      setPeripheral(peripheral);
      console.log("Connected to: ", peripheral.id);
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
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
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
    if (value[0] === 79) {
      dispatch(bleActions.setStatus("downloadingFirmware"));
    } else {
      dispatch(bleActions.setStatus("notificationFail"));
    }
  };

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
        startNotification();
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
        stopNotification();
      }, 500);
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
