import { useCallback, useEffect, useRef, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";

import BleManager, { Peripheral } from "react-native-ble-manager";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import deviceApi from "~/api/device";
import { bytesToString, isAndroid } from "~/utils";

import { FileSystem } from "react-native-unimodules";
import { decode, encode } from "base64-arraybuffer";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";

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
  const bleStatus = useAppSelector(state => state.common.bleStatus);
  const dispatch = useDispatch();

  const [peripheral, setPeripheral] = useState<Peripheral | null>(null);
  const [downloadingProgress, setDownloadingProgress] = useState(0);
  const [installingProgress, setInstallingProgress] = useState(0);
  const [firmware, setFirmware] = useState<number[]>([]);
  const [notifStatus, setNotifStatus] = useState<number[]>([]);
  const timeout = useRef<NodeJS.Timeout>();

  const [registerDevice, devEUIResult] = deviceApi.usePostDeviceMutation();

  const disconnect = async () => {
    if (peripheral) {
      const connected = await BleManager.isPeripheralConnected(
        peripheral.id,
        [],
      );
      if (connected) {
        await BleManager.disconnect(peripheral.id)
          .catch(err => console.log("Failed to disconnect: ", err))
          .then(() => {
            console.log("Disconnected to: ", peripheral.id);
          });
      }
    }
  };

  const stopNotification = useCallback(() => {
    /*  BleManager.stopNotification(
      (peripheral as Peripheral).id,
      OTAControlPoint.UUID,
      OTAControlPoint.CharacteristicA,
    )
      .catch(err => console.log("Failed to stop notification: ", err))
      .finally(() => {
        disconnect().finally(() => {
          setInstallingProgress(0);
        });
      }); */
  }, [bleStatus]);

  const installFirmware = useCallback(async () => {
    if (!firmware) return;
    try {
      for (let i = 0; i < Math.floor(firmware.length / interval); i++) {
        const data = firmware.slice(i * interval, (i + 1) * interval);
        setInstallingProgress(
          Math.round(((interval * i) / firmware.length) * 100),
        );
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicB,
          firmware.slice(i * interval, (i + 1) * interval),
          512,
        );
        console.log(`count: ${i}`, data, data.length);
      }
      if (firmware.length % interval !== 0) {
        await BleManager.write(
          (peripheral as Peripheral).id,
          OTAControlPoint.UUID,
          OTAControlPoint.CharacteristicB,
          firmware.slice(-(firmware.length % interval)),
          512,
        );
        console.log(firmware.slice(-(firmware.length % interval)));
      }
      dispatch(
        commonActions.setBleStatus(
          isOtaUpdate ? "otaUpdateSuccess" : "allSuccess",
        ),
      );
    } catch (error) {
      disconnect().finally(() => {
        console.log("Failed to send firmware: ", error);
        dispatch(commonActions.setBleStatus("installingFail"));
      });
    }
  }, [bleStatus]);

  useEffect(() => {
    if (firmware.length) {
      console.log("Firmware download has completed.");
      setTimeout(() => {
        dispatch(commonActions.setBleStatus("firmwareInstalling"));
      }, 1000);
    }
  }, [firmware]);

  const downloadFirmware = useCallback(() => {
    const downloadResumable = new FileSystem.DownloadResumable(
      "https://next-bnb-jw.s3.ap-northeast-2.amazonaws.com/hello_world.bin",
      FileSystem.cacheDirectory + "Release.bin",
      {},
      downloadProgress => {
        const progress = Math.floor(
          (downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite) *
            100,
        );
        setDownloadingProgress(progress);
      },
    );
    downloadResumable
      .downloadAsync()
      .then(value => {
        if (value) {
          setTimeout(() => {
            FileSystem.readAsStringAsync(value.uri, {
              encoding: FileSystem.EncodingType.Base64,
            })
              .then(data => {
                const arr = Object.values(new Uint8Array(decode(data)));
                setFirmware(arr);
              })
              .catch(err => console.log(err));
          }, 500);
        }
      })
      .catch(error => {
        console.log("Failed to download: ", error);
        dispatch(commonActions.setBleStatus("downloadingFail"));
      });
  }, [bleStatus]);

  useEffect(() => {
    if (notifStatus[0] === 79 && notifStatus[1] === 75) {
      console.log("yes");
      dispatch(commonActions.setBleStatus("firmwareDownloading"));
    }
    if (notifStatus[0] === 78 && notifStatus[1] === 79) {
      disconnect().finally(() => {
        console.log("no");
        dispatch(commonActions.setBleStatus("notificationFail"));
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
        console.log("Succeded to start notification: ", peripheral?.id);
      })
      .catch(error => {
        disconnect().finally(() => {
          console.log("Failed to start notification: ", error);
          dispatch(commonActions.setBleStatus("startNotificationFail"));
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
        dispatch(commonActions.setBleStatus("devEUIFail"));
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
          dispatch(commonActions.setBleStatus("retrieveFail"));
        });
      });
  };

  const getPeripheralData = useCallback(() => {
    BleManager.retrieveServices((peripheral as Peripheral).id)
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
          dispatch(commonActions.setBleStatus("retrieveFail"));
        });
      });
  }, [bleStatus]);

  const handleConnect = (peripheral: Peripheral) => {
    console.log(peripheral);
    BleManager.connect(peripheral.id)
      .then(async () => {
        console.log("Connected to: ", peripheral.id);
        if (isAndroid) await BleManager.requestMTU(peripheral.id, 515);
        dispatch(commonActions.setBleStatus("scanningSuccess"));
      })
      .catch(error => {
        console.log("Failed to connect: ", error);
        dispatch(commonActions.setBleStatus("connectingFail"));
      });
  };

  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    if (
      !peripheral ||
      !peripheral.name ||
      !peripheral.name.includes("EODIGAE")
    ) {
      return;
    }
    setPeripheral(peripheral);
    BleManager.stopScan().then(() => {
      if (timeout.current) clearTimeout(timeout.current);
      handleConnect(peripheral);
    });
  };

  const scanPeripheral = useCallback(() => {
    BleManager.scan([], 10, false);
    timeout.current = setTimeout(() => {
      if (!peripheral) {
        BleManager.stopScan().then(() => {
          dispatch(commonActions.setBleStatus("scanningFail"));
        });
      }
    }, 10000);
  }, [bleStatus]);

  useEffect(() => {
    console.log(bleStatus);
    if (bleStatus === "scanning") {
      /*   scanPeripheral();
      return; */
    }
    if (bleStatus === "scanningSuccess") {
      getPeripheralData();
      return;
    }
    if (bleStatus === "firmwareDownloading") {
      downloadFirmware();
      return;
    }
    if (bleStatus === "firmwareInstalling") {
      installFirmware();
      return;
    }
    if (bleStatus === "otaUpdateSuccess" || bleStatus === "allSuccess") {
      stopNotification();
      return;
    }
  }, [bleStatus]);

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
    downloadingProgress,
    installingProgress,
  };
};

export default useBleMaganer;
