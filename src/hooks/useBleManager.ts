import { useEffect, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";

import BleManager, { Peripheral } from "react-native-ble-manager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import RNFetchBlob from "rn-fetch-blob";
import { bytesToString, stringToBytes } from "convert-string";
import deviceApi from "~/api/device";

type StatusValue =
  | "before"
  | "scanning"
  | "scanningSuccess"
  | "firmwareDownloading"
  | "firmwareInstalling"
  | "allSuccess"
  | "200Success"
  | "otaUpdateSuccess"
  | "scanningFail"
  | "downloadingFail"
  | "notificationFail";

export interface Status {
  value: StatusValue;
  text: string;
}

const interval = 512;

const OTAControlPoint = {
  UUID: "c4a10060-dd6e-11eb-ba80-0242ac130004",
  CharacteristicA: "c4a1020e-dd6e-11eb-ba80-0242ac130004",
  CharacteristicB: "c4a10146-dd6e-11eb-ba80-0242ac130004",
};

const DeviceInformation = {
  UUID: "c4a0fbce-dd6e-11eb-ba80-0242ac130004",
  CharacteristicA: "c4a0fdf4-dd6e-11eb-ba80-0242ac130004",
};

const useBleMaganer = ({ isOtaUpdate = false } = {}) => {
  const [peripheral, setPeripheral] = useState<Peripheral | null>(null);
  const [status, setStatus] = useState<Status>({
    value: "before",
    text: "",
  });
  const [downloadingProgress, setDownloadingProgress] = useState(0);
  const [installingProgress, setInstallingProgress] = useState(0);
  const [firmware, setFirmware] = useState<number[]>([]);
  const [notifStatus, setNotifStatus] = useState<number[]>([]);

  const [registerDevice, devEUIResult] = deviceApi.usePostDeviceMutation();

  const disconnect = async () => {
    if (peripheral) {
      const connected = await BleManager.isPeripheralConnected(
        peripheral.id,
        [],
      );
      if (connected) {
        await BleManager.disconnect(peripheral.id).then(() => {
          console.log("Disconnected to: ", peripheral.id);
        });
      }
    }
  };

  const stopNotification = () => {
    BleManager.stopNotification(
      (peripheral as Peripheral).id,
      OTAControlPoint.UUID,
      OTAControlPoint.CharacteristicA,
    ).finally(() => {
      disconnect().finally(() => {
        setInstallingProgress(0);
        setStatus({
          value: isOtaUpdate ? "otaUpdateSuccess" : "allSuccess",
          text: isOtaUpdate
            ? "업데이트가 완료되었어요."
            : "디바이스 등록이\n완료되었어요.",
        });
      });
    });
  };

  const sendFirmwareToDevice = async () => {
    console.log(firmware.length);
    try {
      for (let i = 0; i < Math.floor(firmware.length / interval); i++) {
        const data = firmware.slice(i * interval, (i + 1) * interval);
        setInstallingProgress(
          Math.round(((interval * i) / firmware.length) * 100),
        );
        console.log(`count: ${i}`, data, data.length);
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicB,
          firmware.slice(i * interval, (i + 1) * interval),
          512,
        );
      }
      if (firmware.length % interval !== 0) {
        console.log(firmware.slice(-(firmware.length % interval)));
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicB,
          firmware.slice(-(firmware.length % interval)),
          512,
        );
      }
      stopNotification();
    } catch (error) {
      disconnect().finally(() => {
        console.log("Failed to send firmware: ", error);
        setStatus({
          value: "scanningFail",
          text: "펌웨어 설치에\n실패했어요.",
        });
      });
    }
  };

  useEffect(() => {
    if (
      firmware.length !== 0 &&
      notifStatus[0] === 79 &&
      notifStatus[1] === 75 &&
      status.value === "firmwareInstalling"
    ) {
      sendFirmwareToDevice();
    }
  }, [firmware, status, notifStatus]);

  useEffect(() => {
    if (firmware.length !== 0) {
      console.log("Firmware download has completed.");
      setDownloadingProgress(100);
      setTimeout(() => {
        setStatus({
          value: "firmwareInstalling",
          text: "펌웨어 설치 중...",
        });
      }, 3000);
    }
  }, [firmware]);

  useEffect(() => {
    if (status.value === "firmwareDownloading") {
      RNFetchBlob.fetch(
        "GET",
        "https://next-bnb-jw.s3.ap-northeast-2.amazonaws.com/Release.bin",
      )
        .progress({ count: 1 }, (received, total) => {
          console.log(Math.floor((received / total) * 100));
          setDownloadingProgress(Math.floor((received / total) * 100));
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
            value: "downloadingFail",
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
          value: "firmwareDownloading",
          text: "펌웨어 다운로드 중...",
        });
      }, 2000);
    }
    if (notifStatus[0] === 78 && notifStatus[1] === 79) {
      disconnect().finally(() => {
        console.log("no");
        setStatus({
          value: "notificationFail",
          text: "디바이스를 리셋하고\n다시 시도해 주세요.",
        });
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
        disconnect().finally(() => {
          console.log("Failed to start notification: ", error);
          setStatus({
            value: "scanningFail",
            text: "연결이 끊어졌어요.",
          });
        });
      });
  };

  useEffect(() => {
    console.log(devEUIResult);
    if (devEUIResult.data) {
      startNotification();
      /* if (devEUIResult.data.detail.includes("relation")) {
        disconnect().finally(() => {
          setStatus({
            value: "200Success",
            text: "등록이 완료되었어요.",
          });
        });
      } else {
        dispatch(
          storageActions.setDeviceRegistrationStep({
            id: devEUIResult.data.device_id,
          }),
        );
        startNotification();
      } */
    }
    if (devEUIResult.isError && devEUIResult.error.status === 400) {
      disconnect().finally(() => {
        setStatus({
          value: "scanningFail",
          text: "유효하지 않은 DevEUI.",
        });
      });
    }
  }, [devEUIResult]);

  const handleReadDevEUI = () => {
    BleManager.read(
      (peripheral as Peripheral).id,
      DeviceInformation.UUID,
      DeviceInformation.CharacteristicA,
    )
      .then(devEUI => {
        console.log("Succeded to read devEUI: ", bytesToString(devEUI));
        registerDevice(bytesToString(devEUI));
      })
      .catch(error => {
        disconnect().finally(() => {
          console.log("Failed to read devEUI", error);
          setStatus({
            value: "scanningFail",
            text: "디바이스의 데이터를\n가져오지 못했어요.",
          });
        });
      });
  };

  const getPeripheralData = (peripheral: Peripheral) => {
    BleManager.retrieveServices(peripheral.id)
      .then(data => {
        console.log("Succeeded to retrieve data: ", data);
        if (isOtaUpdate) {
          startNotification();
        } else {
          handleReadDevEUI();
        }
      })
      .catch(error => {
        disconnect().finally(() => {
          console.log("Failed to retrieve data: ", error);
          setStatus({
            value: "scanningFail",
            text: "디바이스의 데이터를\n가져오지 못했어요.",
          });
        });
      });
  };

  const handleConnect = (peripheral: Peripheral) => {
    console.log(peripheral);
    BleManager.connect(peripheral.id)
      .then(async () => {
        console.log("Connected to: ", peripheral.id);
        setStatus({
          value: "scanningSuccess",
          text: "연결에 성공했어요.",
        });
        await BleManager.requestMTU(peripheral.id, 515);
        getPeripheralData(peripheral);
      })
      .catch(error => {
        console.log("Failed to connect: ", error);
        BleManager.stopScan().then(() => {
          setStatus({
            value: "scanningFail",
            text: "연결에 실패했어요.",
          });
        });
      });
  };

  useEffect(() => {
    if (!peripheral) return;
    BleManager.stopScan().then(() => {
      handleConnect(peripheral);
    });
  }, [peripheral]);

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
    let timeout: NodeJS.Timeout;
    if (status.value === "scanning") {
      BleManager.scan([], 10, false).then(() => {
        console.log("Scanning...");
      });
      timeout = setTimeout(() => {
        if (!peripheral) {
          BleManager.stopScan().then(() => {
            setStatus({
              value: "scanningFail",
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

  useEffect(() => {
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
    downloadingProgress,
    installingProgress,
  };
};

export default useBleMaganer;
