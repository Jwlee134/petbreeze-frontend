import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://3.36.100.60/wheredog-api",
    prepareHeaders: async headers => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Device", "Walk", "Notification"],
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
