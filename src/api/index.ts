import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "~/store";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.44:5050",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).storage.user.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export default api;
