import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { secureItems } from "~/constants";
import Toast from "react-native-toast-message";
import { ToastType } from "~/styles/toast";

export const baseUrl = "https://dev.petbreeze.co/api";

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: async headers => {
      const token = await SecureStore.getItemAsync(secureItems.token);
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  { maxRetries: 3 },
);

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
    const code = action.payload?.data?.error_code;

    if (originalStatus === 500 || originalStatus === 502) {
      Toast.show({
        type: ToastType.Error,
        text1: "서버에 연결할 수 없습니다.",
      });
    }

    if (code === "D012") {
      Toast.show({
        type: ToastType.Error,
        text1: "이미 등록된 디바이스입니다.",
        text2: "초대 코드로 디바이스를 등록해 주세요.",
      });
    }
    if (code === "D013") {
      Toast.show({
        type: ToastType.Error,
        text1: "존재하지 않는 초대 코드입니다.",
      });
    }
    if (code === "D014") {
      Toast.show({ type: ToastType.Error, text1: "만료된 초대 코드입니다." });
    }
    if (code === "permission_denied") {
      Toast.show({
        type: ToastType.Error,
        text1: "디바이스의 멤버가 아닙니다.",
      });
    }
    if (code === "D003") {
      Toast.show({
        type: ToastType.Error,
        text1: "디바이스가 존재하지 않습니다.",
      });
    }

    if (status === 400) {
      if (detail.includes("already in emergency")) {
        Toast.show({
          type: ToastType.Error,
          text1: "이미 긴급실종 상태입니다.",
        });
      }
      if (detail.includes("not in emergency")) {
        Toast.show({
          type: ToastType.Error,
          text1: "긴급실종 상태가 아닙니다.",
        });
      }
      if (detail.includes("member user can be owner user")) {
        Toast.show({
          type: ToastType.Error,
          text1: "디바이스의 멤버가 아닙니다.",
        });
      }
    }

    if (status === 403) {
      Toast.show({
        type: ToastType.Error,
        text1: "디바이스의 멤버가 아닙니다.",
      });
    }

    if (status === 404) {
      if (detail === "Device id does not exist.") {
        Toast.show({
          type: ToastType.Error,
          text1: "디바이스가 존재하지 않습니다.",
        });
      }
      if (detail.includes("not in emergency")) {
        Toast.show({
          type: ToastType.Error,
          text1: "긴급실종 상태가 아닙니다.",
        });
      }
      if (detail === "Walk id does not exist.") {
        Toast.show({
          type: ToastType.Error,
          text1: "산책 기록이 존재하지 않습니다.",
        });
      }
      if (detail === "User id does not exist.") {
        Toast.show({
          type: ToastType.Error,
          text1: "사용자가 존재하지 않습니다.",
        });
      }
    }

    if (status === 409) {
      Toast.show({
        type: ToastType.Error,
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
