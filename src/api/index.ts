import axios from "axios";
import { store } from "~/store";

export const api = axios.create({
  baseURL: "http://192.168.0.44:5050",
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
