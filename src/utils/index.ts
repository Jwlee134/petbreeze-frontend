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
