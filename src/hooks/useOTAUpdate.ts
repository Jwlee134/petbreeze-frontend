import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  NativeEventEmitter,
  NativeModules,
} from "react-native";

import BleManager, { Peripheral } from "react-native-ble-manager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import RNFetchBlob from "rn-fetch-blob";
import { bytesToString, stringToBytes } from "convert-string";
import { useDispatch } from "react-redux";

type Status =
  | "before"
  | "searching"
  | "connected"
  | "failed"
  | "downloading"
  | "updating"
  | "profile";

const interval = 1024;

const useOTAUpdate = () => {
  const [peripheral, setPeripheral] = useState<Peripheral | null>(null);

  const [status, setStatus] = useState<Status>("before");
  const [progress, setProgress] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [firmware, setFirmware] = useState<number[]>([]);

  const dispatch = useDispatch();

  const value = useRef(new Animated.Value(0)).current;
  const timeout = useRef<NodeJS.Timeout>();

  const enableNotification = [1, 0];

  const widthInterpolate = value.interpolate({
    inputRange: [0, animatedProgress],
    outputRange: ["0%", `${animatedProgress}%`],
  });

  Animated.timing(value, {
    toValue: animatedProgress,
    duration: 75,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  useEffect(() => {
    if (animatedProgress === progress) return;
    timeout.current = setInterval(() => {
      setAnimatedProgress(prev => prev + 1);
    }, 25);
    return () => {
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    };
  }, [progress]);

  useEffect(() => {
    if (progress === animatedProgress && timeout.current) {
      clearInterval(timeout.current);
    }
    if (animatedProgress === 100) {
      setTimeout(() => {
        setStatus("updating");
      }, 2000);
    }
  }, [progress, animatedProgress]);

  useEffect(() => {
    if (firmware.length !== 0) {
      console.log("Firmware download has completed.");
      setProgress(100);
    }
  }, [firmware]);

  const sendFirmwareToDevice = async (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => {
    for (let i = 0; i < Math.floor(firmware.length / interval); i++) {
      await BleManager.write(
        peripheralId,
        serviceUUID,
        characteristicUUID,
        firmware.slice(i * interval, (i + 1) * interval),
      );
    }
    BleManager.write(
      peripheralId,
      serviceUUID,
      characteristicUUID,
      firmware.slice(-(firmware.length % interval)),
    );
  };

  const handleDownloadFirmware = async () => {
    setStatus("downloading");
    const res = await RNFetchBlob.fetch(
      "GET",
      "http://192.168.137.1:8888/Release.bin",
    ).progress({ interval: 10 }, (received, total) => {
      console.log("progress", `${Math.round((received / total) * 100)}%`);
      setProgress(Math.round((received / total) * 100));
    });
    const status = res.info().status;
    if (status === 200) {
      const bytesArr = stringToBytes(res.text() as string);
      setFirmware(bytesArr);
    } else {
      console.log("Download failed.");
    }
  };

  const handleReadData = async (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => {
    const readData = await BleManager.read(
      peripheralId,
      serviceUUID,
      characteristicUUID,
    );
    console.log(readData);
    /* readData = DevEUI, 서비스 서버로 DevEUI 전송 */
  };

  const getPeripheralData = async (peripheral: Peripheral) => {
    const peripheralData = await new Promise<BleManager.PeripheralInfo>(
      resolve => {
        setTimeout(async () => {
          const peripheralData = await BleManager.retrieveServices(
            peripheral.id,
          );
          resolve(peripheralData);
        }, 900);
      },
    );
    console.log(peripheralData);
    const serviceUUID = peripheralData.characteristics[4].service;
    const characteristicUUID = peripheralData.characteristics[4].characteristic;

    /* Client에서 Notification 수신 이벤트 활성화 */
    await BleManager.startNotification(
      peripheral.id,
      serviceUUID,
      characteristicUUID,
    );
    /* 디바이스에 Notification 활성화 요청 */
    await BleManager.writeWithoutResponse(
      peripheral.id,
      serviceUUID,
      characteristicUUID,
      enableNotification,
    );

    handleReadData(peripheral.id, serviceUUID, characteristicUUID);
  };

  const handleDiscoverPeripheral = async (peripheral: Peripheral) => {
    if (!peripheral || !peripheral.name || !peripheral.name.includes("ESP")) {
      return;
    }
    setPeripheral(peripheral);
  };

  const handleConnect = async (peripheral: Peripheral) => {
    const id = "AC:67:B2:DD:EB:42";
    if (peripheral.id === id) {
      console.log(peripheral);
      await BleManager.connect(peripheral.id);
      setStatus("connected");
      console.log("Connected to: ", peripheral.id);
      setTimeout(() => {
        handleDownloadFirmware();
      }, 2000);
      getPeripheralData(peripheral);
    }
  };

  const handleStart = () => {
    setStatus("searching");
  };

  const handleStop = async (status: "connected" | "failed") => {
    await BleManager.stopScan();
    console.log("Scan is stopped.");
    if (status === "connected") {
      setStatus("connected");
    } else {
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (!peripheral) return;
    handleConnect(peripheral);
    handleStop("connected");
  }, [peripheral]);

  useEffect(() => {
    if (status === "searching" && !peripheral) {
      BleManager.scan([], 10, false).then(() => {
        console.log("Scanning...");
      });
    }
    const timeout = setTimeout(async () => {
      if (!peripheral) handleStop("failed");
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [status, peripheral]);

  useEffect(() => {
    BleManager.start({ showAlert: false });
    const discover = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral,
    );
    const notification = bleManagerEmitter.addListener(
      "BleManagerDidUpdateValueForCharacteristic",
      ({ value, peripheral, characteristic, service }) => {
        console.log(`Recieved ${value} for characteristic ${characteristic}`);
      },
    );
    return () => {
      discover.remove();
      notification.remove();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (peripheral) {
        console.log("Disconnected to: ", peripheral.id);
        BleManager.disconnect(peripheral.id);
      }
    };
  }, [peripheral]);

  return {
    status,
    animatedProgress,
    handleStart,
    widthInterpolate,
  };
};

export default useOTAUpdate;
