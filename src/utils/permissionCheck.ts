/* eslint-disable no-async-promise-executor */
/* eslint-disable no-case-declarations */
import { Platform } from "react-native";
import {
  check,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import Toast from "react-native-toast-message";
import { isAndroid, isIos } from ".";

export default {
  location: async () => {
    const perm = isIos
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : [
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ];
    const result = await check(Array.isArray(perm) ? perm[1] : perm);
    return new Promise<void>(async (resolve, reject) => {
      switch (result) {
        case RESULTS.DENIED:
          if (Array.isArray(perm)) {
            const results = await requestMultiple(perm);
            const actualResult = results[perm[1]];
            if (actualResult === "granted") resolve();
            else reject();
          } else {
            const result = await request(perm);
            if (result === "granted") resolve();
            else reject();
          }
          break;
        case RESULTS.GRANTED:
          resolve();
          break;
        case RESULTS.BLOCKED:
          Toast.show({
            type: "error",
            onPress: openSettings,
            text1: "위치 권한을 허용해 주세요.",
            text2: "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
          });
          reject();
          break;
        default:
          reject();
          break;
      }
    });
  },
  locationAlways: async () => {
    const perm = isIos
      ? PERMISSIONS.IOS.LOCATION_ALWAYS
      : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
    const result = await check(perm);
    return new Promise<void>(async (resolve, reject) => {
      switch (result) {
        case RESULTS.DENIED:
          if (isAndroid) {
            Toast.show({
              type: "error",
              onPress: openSettings,
              text1: "위치 항상 사용 권한을 허용해 주세요.",
              text2:
                "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
            });
          } else {
            const result = await request(perm);
            if (result === "granted") {
              Toast.show({
                type: "error",
                onPress: openSettings,
                text1: "위치 항상 사용 권한을 허용해 주세요.",
                text2:
                  "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
              });
            }
          }
          reject();
          break;
        case RESULTS.GRANTED:
          resolve();
          break;
        case RESULTS.BLOCKED:
          Toast.show({
            type: "error",
            onPress: openSettings,
            text1: "위치 항상 사용 권한을 허용해 주세요.",
            text2: "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
          });
          reject();
          break;
        default:
          reject();
          break;
      }
    });
  },
  bluetooth: async () => {
    const perm = isIos
      ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
      : [
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        ];
    if (Array.isArray(perm)) {
      if (Platform.Version < 31) {
        return new Promise<void>(resolve => resolve());
      }
      const results = await checkMultiple(perm);
      return new Promise<void>(async (resolve, reject) => {
        if (results[perm[0]] === "granted" && results[perm[1]] === "granted") {
          resolve();
          return;
        }
        if (results[perm[0]] === "denied" && results[perm[1]] === "denied") {
          const results = await requestMultiple(perm);
          if (results[perm[0]] === "granted" && results[perm[1]] === "granted")
            resolve();
          else reject();
          return;
        }
        if (results[perm[0]] === "blocked" || results[perm[1]] === "blocked") {
          Toast.show({
            type: "error",
            onPress: openSettings,
            text1: "블루투스 사용 권한을 허용해 주세요.",
            text2: "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
          });
          reject();
        }
      });
    }
    const result = await check(perm);
    return new Promise<void>(async (resolve, reject) => {
      switch (result) {
        case RESULTS.DENIED:
          const result = await request(perm);
          if (result === "granted") resolve();
          else reject();
          break;
        case RESULTS.GRANTED:
          resolve();
          break;
        case RESULTS.BLOCKED:
          Toast.show({
            type: "error",
            onPress: openSettings,
            text1: "블루투스 사용 권한을 허용해 주세요.",
            text2: "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
          });
          reject();
          break;
        default:
          reject();
          break;
      }
    });
  },
  camera: async () => {
    const perm = isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    const result = await check(perm);
    return new Promise<void>(async (resolve, reject) => {
      if (result === "granted") {
        resolve();
        return;
      }
      if (result === "denied") {
        const result = await request(perm);
        if (result === "granted") resolve();
        else reject();
        return;
      }
      if (result === "blocked") {
        Toast.show({
          type: "error",
          onPress: openSettings,
          text1: "카메라 사용 권한을 허용해 주세요.",
          text2: "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
        });
        reject();
      }
    });
  },
  library: async () => {
    const perm = isIos
      ? [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]
      : [
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ];
    const results = await checkMultiple(perm);
    return new Promise<void>(async (resolve, reject) => {
      if (results[perm[0]] === "granted" && results[perm[1]] === "granted") {
        resolve();
        return;
      }
      if (results[perm[0]] === "denied" && results[perm[1]] === "denied") {
        const results = await requestMultiple(perm);
        if (results[perm[0]] === "granted" && results[perm[1]] === "granted")
          resolve();
        else reject();
        return;
      }
      if (results[perm[0]] === "blocked" || results[perm[1]] === "blocked") {
        Toast.show({
          type: "error",
          onPress: openSettings,
          text1: "저장소 접근 권한을 허용해 주세요.",
          text2: "클릭하여 설정으로 이동합니다. 허용 후 다시 시도해 주세요.",
        });
        reject();
      }
    });
  },
};
