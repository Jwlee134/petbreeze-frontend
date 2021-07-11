import { useEffect, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";

import BleManager, { Peripheral } from "react-native-ble-manager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import RNFetchBlob from "rn-fetch-blob";
import { bytesToString, stringToBytes } from "convert-string";
import { useDispatch } from "react-redux";
import { Status } from "~/types";
import { useLazyRegisterDeviceQuery } from "~/api/device";

const interval = 20;

const OTAControlPoint = {
  UUID: "c4a10060-dd6e-11eb-ba80-0242ac130004",
  CharacteristicA: "c4a1020e-dd6e-11eb-ba80-0242ac130004",
  CharacteristicB: "c4a10146-dd6e-11eb-ba80-0242ac130004",
};

const DeviceInformation = {
  UUID: "c4a0fbce-dd6e-11eb-ba80-0242ac130004",
  CharacteristicA: "c4a0fdf4-dd6e-11eb-ba80-0242ac130004",
};

const useOTAUpdate = () => {
  const [peripheral, setPeripheral] = useState<Peripheral | null>(null);

  const [status, setStatus] = useState<Status>({
    value: "before",
    text: "",
  });
  const [progress, setProgress] = useState(0);
  const [firmware, setFirmware] = useState<number[]>([]);
  const [notifStatus, setNotifStatus] = useState<number[]>([]);

  const [registerDevice, devEUIResult] = useLazyRegisterDeviceQuery();

  const dispatch = useDispatch();

  const disconnect = () => {
    if (peripheral) {
      BleManager.isPeripheralConnected(peripheral.id, []).then(isConnected => {
        if (isConnected) {
          BleManager.disconnect(peripheral.id);
        }
      });
    }
  };

  const stopNotification = () => {
    BleManager.stopNotification(
      (peripheral as Peripheral).id,
      OTAControlPoint.UUID,
      OTAControlPoint.CharacteristicA,
    )
      .then(() => {
        console.log("Succeded to stop notification");
      })
      .catch(error => {
        console.log("Failed to stop notification: ", error);
      });
  };

  const sendFirmwareToDevice = async () => {
    console.log(firmware.length);
    try {
      for (let i = 0; i < Math.floor(firmware.length / interval); i++) {
        const data = firmware.slice(i * interval, (i + 1) * interval);
        console.log(`count: ${i}`, data);
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicB,
          firmware.slice(i * interval, (i + 1) * interval),
        );
      }
      if (firmware.length % interval !== 0) {
        console.log(firmware.slice(-(firmware.length % interval)));
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicB,
          firmware.slice(-(firmware.length % interval)),
        );
      }
      stopNotification();
    } catch (error) {
      disconnect();
      console.log("Failed to send firmware: ", error);
      setStatus({
        value: "connectFailed",
        text: "펌웨어 설치에\n실패했어요.",
      });
    }
  };

  useEffect(() => {
    if (
      firmware.length !== 0 &&
      notifStatus[0] === 79 &&
      notifStatus[1] === 75 &&
      status.value === "installing"
    ) {
      sendFirmwareToDevice();
    }
  }, [firmware, status, notifStatus]);

  useEffect(() => {
    if (progress === 100 && status.value !== "downloadFailed") {
      setTimeout(() => {
        setStatus({
          value: "installing",
          text: "펌웨어 설치 중...",
        });
      }, 3000);
    }
  }, [progress]);

  useEffect(() => {
    if (firmware.length !== 0) {
      console.log("Firmware download has completed.");
      setProgress(100);
    }
  }, [firmware]);

  useEffect(() => {
    if (status.value === "downloading") {
      RNFetchBlob.fetch("GET", "http://192.168.137.1:8888/Release.bin")
        .progress({ count: 1 }, (received, total) => {
          console.log("progress", `${Math.floor((received / total) * 100)}%`);
          setProgress(Math.floor((received / total) * 100));
        })
        .then(res => {
          const status = res.info().status;
          if (status === 200) {
            const bytesArr = stringToBytes(res.text() as string);
            setFirmware(bytesArr);
          }
        })
        .catch(error => {
          console.log("Failed to download: ", error);
          setStatus({
            value: "downloadFailed",
            text: `펌웨어 다운로드에\n실패했어요.`,
          });
        });
    }
  }, [status]);

  useEffect(() => {
    if (notifStatus[0] === 79 && notifStatus[1] === 75) {
      console.log("yes");
      setTimeout(() => {
        setStatus({
          value: "downloading",
          text: "펌웨어 다운로드 중...",
        });
      }, 2000);
    }
    if (notifStatus[0] === 78 && notifStatus[1] === 79) {
      disconnect();
      console.log("no");
      setStatus({
        value: "notifFailed",
        text: "디바이스에 문제가",
      });
    }
  }, [notifStatus]);

  const startNotification = () => {
    BleManager.startNotification(
      (peripheral as Peripheral).id,
      OTAControlPoint.UUID,
      OTAControlPoint.CharacteristicA,
    )
      .then(() => {
        console.log("Succeded to start notification");
      })
      .catch(error => {
        disconnect();
        console.log("Failed to start notification: ", error);
        setStatus({
          value: "connectFailed",
          text: "연결이 끊어졌어요.",
        });
      });
  };

  useEffect(() => {
    console.log(devEUIResult);
  }, [devEUIResult]);

  const handleReadDevEUI = () => {
    BleManager.read(
      (peripheral as Peripheral).id,
      DeviceInformation.UUID,
      DeviceInformation.CharacteristicA,
    )
      .then(devEUI => {
        console.log("Succeded to read devEUI: ", bytesToString(devEUI));
        /* devEUI 서버로 전송 후 status code에 따라 기등록인지 미등록인지 체크 */
        /* registerDevice(bytesToString(devEUI)); */

        startNotification();
      })
      .catch(error => {
        disconnect();
        console.log("Failed to read devEUI", error);
        setStatus({
          value: "connectFailed",
          text: "디바이스의 데이터를\n가져오지 못했어요.",
        });
      });
  };

  const getPeripheralData = (peripheral: Peripheral) => {
    BleManager.retrieveServices(peripheral.id)
      .then(data => {
        console.log("Succeeded to retrieve data: ", data);
        handleReadDevEUI();
      })
      .catch(error => {
        disconnect();
        console.log("Failed to retrieve data: ", error);
        setStatus({
          value: "connectFailed",
          text: "디바이스의 데이터를\n가져오지 못했어요.",
        });
      });
  };

  const handleConnect = (peripheral: Peripheral) => {
    console.log(peripheral);
    BleManager.connect(peripheral.id)
      .then(async () => {
        console.log("Connected to: ", peripheral.id);
        await BleManager.requestMTU(peripheral.id, 500);
        getPeripheralData(peripheral);
      })
      .catch(error => {
        console.log("Failed to connect: ", error);
        BleManager.stopScan().then(() => {
          setStatus({
            value: "connectFailed",
            text: "연결에 실패했어요.",
          });
        });
      });
  };

  useEffect(() => {
    if (!peripheral) return;
    BleManager.stopScan().then(() => {
      setStatus({
        value: "connected",
        text: "연결에 성공했어요.",
      });
      handleConnect(peripheral);
    });
  }, [peripheral]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (status.value === "searching") {
      BleManager.scan([], 10, false).then(() => {
        console.log("Scanning...");
      });
      timeout = setTimeout(() => {
        if (!peripheral) {
          BleManager.stopScan().then(() => {
            setStatus({
              value: "connectFailed",
              text: "연결에 실패했어요.",
            });
          });
        }
      }, 10000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    if (
      !peripheral ||
      !peripheral.name ||
      !peripheral.name.includes("EODIGAE")
    ) {
      return;
    }
    setPeripheral(peripheral);
  };

  useEffect(() => {
    BleManager.start({ showAlert: false });
    const discover = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral,
    );
    const notification = bleManagerEmitter.addListener(
      "BleManagerDidUpdateValueForCharacteristic",
      ({ value }) => {
        console.log("Notification has been arrived: ", value);
        setNotifStatus(value);
      },
    );
    return () => {
      discover.remove();
      notification.remove();
    };
  }, []);

  return {
    status,
    setStatus,
    progress,
    disconnect,
  };
};

export default useOTAUpdate;
