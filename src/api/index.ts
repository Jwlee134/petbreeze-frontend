import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { SECURE_ITEMS, TOAST_TYPE } from "~/constants";
import Toast from "react-native-toast-message";
import { store } from "~/store";
import { commonActions } from "~/store/common";
import { DeviceCoord } from "./device";
import { getDistanceBetween2Points } from "~/utils";

export const baseUrl = "https://dev.petbreeze.co/api";

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: async headers => {
      const token = await SecureStore.getItemAsync(SECURE_ITEMS.TOKEN);
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

export const testApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://172.30.1.117:4000" }),
  reducerPath: "testApi",
  endpoints: builder => ({
    getPath: builder.query<[number, number, string][], string>({
      query: date => ({
        url: `/path?date=${date}`,
        method: "GET",
        responseHandler: async res => {
          const data: DeviceCoord[] = await res.json();
          return (
            data
              ?.map(item => [
                item.coordinate.coordinates[0],
                item.coordinate.coordinates[1],
                item.date_time,
              ])
              ?.filter((item, index, arr) => {
                const prevCoord = arr[index - 1];
                if (!prevCoord) return true;
                const distance = getDistanceBetween2Points(
                  item[1] as number,
                  item[0] as number,
                  prevCoord[1] as number,
                  prevCoord[0] as number,
                );
                if (distance < 10) return false;
                return true;
              })
              ?.reverse() || []
          );
        },
      }),
    }),
  }),
});

export const rtkQueryErrorLogger: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    const originalStatus = action.payload?.originalStatus;
    const status = action.payload?.status;
    const code = action.payload?.data?.error_code;

    if (originalStatus?.toString()[0] === "5") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "서버에 연결할 수 없습니다.",
      });
    }

    if (status === 409) {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "이미 다른 소셜 계정으로 가입된 이메일입니다.",
      });
    }

    if (code === "D003") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "디바이스가 존재하지 않습니다.",
      });
    }
    if (code === "D008") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "존재하지 않는 사용자입니다.",
      });
    }
    if (code === "D010") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "존재하지 않는 산책 기록입니다.",
      });
    }
    if (code === "D012") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "이미 등록된 디바이스입니다.",
        text2: "초대 코드로 디바이스를 등록해 주세요.",
      });
    }
    if (code === "D013") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "존재하지 않는 초대 코드입니다.",
      });
    }
    if (code === "D014") {
      Toast.show({ type: TOAST_TYPE.ERROR, text1: "만료된 초대 코드입니다." });
    }
    if (code === "D016") {
      Toast.show({ type: TOAST_TYPE.ERROR, text1: "이미 실종 상태입니다." });
    }
    if (code === "D017") {
      Toast.show({ type: TOAST_TYPE.ERROR, text1: "실종 상태가 아닙니다." });
    }
    if (code === "authentication_failed") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "세션이 만료되었습니다.",
        text2: "클릭하여 다시 로그인해주세요.",
        autoHide: false,
        onPress: () => {
          store.dispatch(commonActions.setIsTokenInvalid(true));
          Toast.hide();
        },
      });
    }
    if (code === "permission_denied") {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: "요청을 수행할 권한이 없습니다.",
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
