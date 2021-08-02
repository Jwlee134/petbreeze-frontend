import { addHours, format } from "date-fns";
import { ko } from "date-fns/locale";
import { Alert, Platform } from "react-native";
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
} from "react-native-permissions";
import { IReverseGeocoding } from "~/types/api";

export const isAndroid = Platform.OS === "android";

export const isIos = Platform.OS === "ios";

export const localToISOString = (date: Date) => addHours(date, 9).toISOString();

export const ISOStringToLocal = (date: string) =>
  format(addHours(new Date(date), -9), "M월 d일 a h시", { locale: ko });

export const insertPointToString = (text: string) =>
  text.replace(/(\d{4})(\d{2})(\d{2})/, "$1. $2. $3");

export const insertDashToString = (text: string) =>
  text.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

export const formatUTC = (dataArray: number[]) => {
  const date = (dataArray[0] << 12) | (dataArray[1] << 4) | (dataArray[2] >> 4);

  const utc =
    ((dataArray[2] & 0x0f) << 16) | (dataArray[3] << 8) | dataArray[4];

  return { date, utc };
};

export const formatCoordinates = (dataArray: number[]) => {
  let _lat =
    (((dataArray[0] & 0x7f) << 20) |
      (dataArray[1] << 12) |
      (dataArray[2] << 4) |
      (dataArray[3] >> 4)) /
    1000000;
  const lat = _lat * (dataArray[0] >> 7 ? -1 : 1);

  let _lng =
    (((dataArray[3] & 0x0f) << 24) |
      (dataArray[4] << 16) |
      (dataArray[5] << 8) |
      dataArray[6]) /
    1000000;
  const lng = _lng * ((dataArray[3] & 0x0f) >> 3 ? -1 : 1);

  return { lat, lng };
};

export const formatGeocodingAddr = (data: IReverseGeocoding) => {
  return data.results.map(({ region, land }) => {
    let fullAddr = "";

    const regionName = Object.values(region)
      .filter((area, index) => {
        if (index === 0) return false;
        return area.name;
      })
      .map(area => area.name)
      .join(" ");

    if (land) {
      if (land.number1 && !land.number2) {
        fullAddr = `${regionName} ${land.number1}`;
      } else if (land.number1 && land.number2) {
        fullAddr = `${regionName} ${land.number1}-${land.number2}`;
      }
    } else {
      fullAddr = regionName;
    }
    return fullAddr;
  });
};

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
      latitude: latitude,
      longitude: lng0,
    }, //left
    {
      latitude: latitude,
      longitude: lng1,
    }, //right
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
  if (days < 7) return `${Math.floor(days)}일 전`;
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
