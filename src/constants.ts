import { Platform } from "react-native";

export const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
export const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export const DELTA = 0.003;

export const DEFAULT_NAME = "익명";
export const SERVER_IMAGE_URI = "amazonaws";
export const DEFAULT_AVATAR = require("~/assets/image/default-avatar.png");

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const SECURE_ITEMS = {
  TOKEN: "token",
  FIREBASE_TOKEN: "firebaseToken",
  USER_ID: "userID",
} as const;

export const enum GEOJSON_TYPE {
  POINT = "Point",
  LINE_STRING = "LineString",
}
export const enum TOAST_TYPE {
  NOTIFICATION = "notification",
  ERROR = "error",
}
export const enum NOTIFICATION_TYPE {
  LOW_BATTERY,
  EXIT_AREA,
  COME_BACK_AREA,
  START_WALK,
  FINISH_WALK,
}
