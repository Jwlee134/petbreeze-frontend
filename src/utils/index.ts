import { addHours, format } from "date-fns";
import { ko } from "date-fns/locale";
import { IReverseGeocoding } from "~/types/api";

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

export const get4PointsAroundCircumference = (
  latitude: number,
  longitude: number,
  radius: number,
) => {
  const earthRadius = 6378100; // m
  const lat0 = latitude + (-radius / earthRadius) * (180 / Math.PI);
  const lat1 = latitude + (radius / earthRadius) * (180 / Math.PI);
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
      latitude: lat0,
      longitude: longitude,
    }, //bottom
    {
      latitude: latitude,
      longitude: lng0,
    }, //left
    {
      latitude: lat1,
      longitude: longitude,
    }, //top
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
