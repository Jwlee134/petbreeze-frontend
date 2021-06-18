import axios from "axios";
import { store } from "~/store";

export const api = axios.create({
  baseURL: "http://112.171.103.34:5050",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
