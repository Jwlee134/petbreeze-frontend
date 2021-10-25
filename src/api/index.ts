import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { secureItems } from "~/constants";

export const baseUrl = "http://3.36.100.60/wheredog-api";

let isRequesting = false;

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
  baseQuery: async (args, baseQueryApi, extraOptions) => {
    const result = await baseQuery(args, baseQueryApi, extraOptions);

    if (
      result.error &&
      "originalStatus" in result.error &&
      result.error.originalStatus === 500
    ) {
      Toast.show({ type: "error", text1: "서버에 연결할 수 없습니다." });
    }

    return result;
  },
  tagTypes: ["Device", "Walk", "Notification", "Member"],
  endpoints: () => ({}),
});

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
