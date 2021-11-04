/* eslint-disable default-case */
import { Alert, Platform } from "react-native";
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
} from "react-native-permissions";
import Toast from "react-native-toast-message";
import { store } from "~/store";
import { bleActions } from "~/store/ble";
import { deviceSettingActions } from "~/store/deviceSetting";
import { storageActions } from "~/store/storage";

export const resetAll = () => {
  store.dispatch(bleActions.reset());
  store.dispatch(deviceSettingActions.reset());
  store.dispatch(storageActions.reset());
};

export const formatWalkTime = (minute: number) => {
  return `${
    minute < 60
      ? `${minute}분`
      : `${Math.floor(minute / 60)}시간 ${
          minute % 60 === 0 ? "" : `${minute % 60}분`
        }`
  }`;
};

export const formatWalkDistance = (meter: number) => {
  return `${
    meter < 1000
      ? `${meter}m`
      : `${Math.floor(meter / 1000)}${
          meter % 1000 === 0 || (meter % 1000).toString().length < 3
            ? ""
            : `.${(meter % 1000).toString().substr(0, 1)}`
        }km`
  }`;
};

export const delay = (sec: number) =>
  new Promise<void>(resolve => setTimeout(resolve, sec));

export const isAndroid = Platform.OS === "android";

export const isIos = Platform.OS === "ios";

export const bytesToString = (bytes: number[]) =>
  bytes.map(x => String.fromCharCode(x)).join("");

export const stringToBytes = (str: string): number[] =>
  str.split("").map(x => x.charCodeAt(0));

export const getLeftRightPointsOfCircle = (
  latitude: number,
  longitude: number,
  radius: number,
) => {
  const earthRadius = 6378100;
  const lng0 =
    longitude +
    ((-radius / earthRadius) * (180 / Math.PI)) /
      Math.cos((latitude * Math.PI) / 180);
  const lng1 =
    longitude +
    ((radius / earthRadius) * (180 / Math.PI)) /
      Math.cos((latitude * Math.PI) / 180);

  return [
    {
      latitude,
      longitude: lng0 - radius / 100000,
    }, // left
    {
      latitude,
      longitude: lng1 + radius / 100000,
    }, // right
  ];
};

export const formatCreatedAt = (createdAt: string) => {
  const milliSeconds = Date.now() - new Date(createdAt).getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `${Math.floor(seconds)}초 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7)
    return Math.floor(days) === 1 ? "어제" : `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

export const getDistanceBetween2Points = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
};

export const permissionCheck = (type: "location" | "gallery" | "bluetooth") => {
  const permission = () => {
    switch (type) {
      case "location":
        return isAndroid
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_ALWAYS;
      case "gallery":
        return isAndroid
          ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY;
      case "bluetooth":
        return PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL;
    }
  };
  const permissionName = () => {
    switch (type) {
      case "location":
        return isAndroid ? "위치" : "위치 항상 사용";
      case "gallery":
        return isAndroid ? "저장소 접근" : "사진 접근";
      case "bluetooth":
        return "블루투스 사용";
    }
  };

  return new Promise<void>((resolve, reject) => {
    if (type === "bluetooth" && isAndroid) resolve();

    check(permission()).then(status => {
      if (status === "granted") resolve();
      if (status === "blocked") {
        Alert.alert("경고", `${permissionName()} 권한을 허용해 주세요.`, [
          { text: "설정", onPress: openSettings },
        ]);
        reject();
      }
      if (status === "denied") {
        request(permission()).then(result => {
          if (result === "granted") {
            resolve();
          } else {
            reject();
          }
        });
      }
    });
  });
};

export const showLocationError = () => {
  Toast.show({
    type: "error",
    text1: "위치를 불러올 수 없습니다.",
    text2: "위치가 켜져 있거나 위치 권한이 허용되어 있는지 확인하세요.",
  });
};
