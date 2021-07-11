import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "~/store";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://52.79.178.50/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).storage.user.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Device", "Walk"],
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
