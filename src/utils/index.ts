/* eslint-disable default-case */
import { Platform } from "react-native";
import { secureItems } from "~/constants";
import { store } from "~/store";
import { bleActions } from "~/store/ble";
import { commonActions } from "~/store/common";
import { deviceSettingActions } from "~/store/deviceSetting";
import { formActions } from "~/store/form";
import { storageActions } from "~/store/storage";
import * as SecureStore from "expo-secure-store";
import { DateObj, MonthlyWalkRecord } from "~/api/device";
import palette from "~/styles/palette";

const isEndWithConsonant = (str: string) => {
  const finalChrCode = str.charCodeAt(str.length - 1);
  const finalConsonantCode = (finalChrCode - 44032) % 28;
  return finalConsonantCode !== 0 && /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(str);
};

export const consonantResponder = (str: string) =>
  isEndWithConsonant(str) ? "이" : "";

export const resetAll = async () => {
  store.dispatch(bleActions.reset());
  store.dispatch(deviceSettingActions.reset());
  store.dispatch(storageActions.reset());
  store.dispatch(formActions.reset());
  store.dispatch(commonActions.reset());
  await Promise.all(
    Object.values(secureItems).map(item => SecureStore.deleteItemAsync(item)),
  );
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

export const formatMonthlyWalkRecordResponse = (data: MonthlyWalkRecord) => {
  const hasRecords = data.day_count.length > 0;
  if (hasRecords) {
    const obj: DateObj = {};
    //  [["2021-10-16", "0"], ["2021-10-17", "0"], ["2021-10-17", "1"], ["2021-10-18", "0"]]
    const dateArr = data.day_count
      .map(({ date, count }) => {
        const arr: string[][] = [];
        for (let i = 0; i < count; i++) {
          arr.push([date, i.toString()]);
        }
        return arr;
      })
      .flat();
    dateArr.forEach(date => {
      if (!Object.prototype.hasOwnProperty.call(obj, date[0])) {
        obj[date[0]] = {
          dots: [{ key: date[1], color: palette.blue_7b }],
        };
      } else {
        obj[date[0]].dots.push({
          key: date[1],
          color: palette.blue_7b,
        });
      }
    });
    return {
      dateObj: data.day_count.length ? obj : null,
      summary: data.summary,
    };
  }
  return null;
};

export const formatYYYYMMDD = (date: string) =>
  `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(
    date,
  ).getDate()}`;

export const delay = (milliSec: number) =>
  new Promise<void>(resolve => setTimeout(resolve, milliSec));

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
      longitude: lng0 - radius / (isIos ? 100000 : 200000),
    }, // left
    {
      latitude,
      longitude: lng1 + radius / (isIos ? 100000 : 200000),
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
