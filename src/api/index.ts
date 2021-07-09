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
  tagTypes: ["Device"],
  endpoints: () => ({}),
});

export default api;
