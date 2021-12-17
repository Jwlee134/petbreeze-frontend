import { useDispatch } from "react-redux";
import WifiManager from "react-native-wifi-reborn";
import { deviceSettingActions } from "~/store/deviceSetting";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { ToastType } from "~/styles/toast";
import permissionCheck from "~/utils/permissionCheck";
import { isAndroid } from "~/utils";

const useWiFi = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const dispatch = useDispatch();

  const getCurrentWiFiSSID = () => {
    permissionCheck.location().then(() => {
      WifiManager.getCurrentWifiSSID().then(ssid => {
        dispatch(deviceSettingActions.setWiFiDraft({ ssid }));
      });
    });
  };

  const execute = (
    ssid: string,
    password: string,
    resolve: (value: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void,
  ) => {
    setIsConnecting(true);
    WifiManager.connectToProtectedSSID(ssid, password, false)
      .then(() => {
        Toast.show({
          type: ToastType.Notification,
          text1: "WiFi 검증이 완료되었습니다.",
        });
      })
      .catch(reject)
      .finally(() => {
        setIsConnecting(false);
      });
  };

  const connectToProtectedSSID = (ssid: string, password: string) =>
    new Promise<void>((resolve, reject) => {
      if (isAndroid) {
        WifiManager.isEnabled().then(enabled => {
          if (!enabled) {
            Toast.show({
              type: ToastType.Error,
              text1: "WiFi 검증을 위해 WiFi를 켜주세요.",
            });
            reject();
          } else {
            execute(ssid, password, resolve, reject);
          }
        });
      } else {
        WifiManager.getCurrentWifiSSID()
          .then(currentSSID => {
            if (currentSSID === ssid) {
              Toast.show({
                type: ToastType.Error,
                text1: "동일한 WiFi에 이미 연결되어 있습니다.",
                text2: "WiFi 검증을 위해 잠시 연결을 해제해 주세요.",
              });
              reject();
            } else {
              execute(ssid, password, resolve, reject);
            }
          })
          .catch(() => {
            // 와이파이가 꺼져있어 에러가 발생했을 경우
            execute(ssid, password, resolve, reject);
          });
      }
    });

  return { getCurrentWiFiSSID, connectToProtectedSSID, isConnecting };
};

export default useWiFi;
