import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { secureItems } from "~/constants";
import Toast from "react-native-toast-message";

export const baseUrl = "http://3.36.100.60/wheredog-api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async headers => {
    const token = await SecureStore.getItemAsync(secureItems.token);
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  baseQuery,
  tagTypes: ["Device", "Walk", "Notification", "Member"],
  endpoints: () => ({}),
});

export const rtkQueryErrorLogger: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    const originalStatus = action.payload?.originalStatus;
    const status = action.payload?.status;
    const detail = action.payload?.data?.detail;

    if (originalStatus === 500) {
      Toast.show({ type: "error", text1: "서버에 연결할 수 없습니다." });
    }

    if (status === 400) {
      if (detail.includes("already in emergency")) {
        Toast.show({ type: "error", text1: "이미 긴급실종 상태입니다." });
      }
      if (detail.includes("not in emergency")) {
        Toast.show({ type: "error", text1: "긴급실종 상태가 아닙니다." });
      }
    }

    if (status === 403) {
      Toast.show({ type: "error", text1: "디바이스의 멤버가 아닙니다." });
    }

    if (status === 404) {
      if (detail === "Device id does not exist.") {
        Toast.show({ type: "error", text1: "디바이스가 존재하지 않습니다." });
      }
      if (detail.includes("not in emergency")) {
        Toast.show({ type: "error", text1: "긴급실종 상태가 아닙니다." });
      }
      if (detail === "Walk id does not exist.") {
        Toast.show({
          type: "error",
          text1: "산책 기록이 존재하지 않습니다.",
        });
      }
      if (detail === "User id does not exist.") {
        Toast.show({ type: "error", text1: "사용자가 존재하지 않습니다." });
      }
    }

    if (status === 409) {
      Toast.show({
        type: "error",
        text1: "이미 다른 소셜 계정으로 가입된 이메일입니다.",
      });
    }
  }

  return next(action);
};

export function providesList<
  R extends { id: string | number }[],
  T extends string,
>(resultsWithIds: R | undefined, tagType: T) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export default api;
