import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BleStatus =
  | "before"
  | "scanning"
  | "scanningSuccess"
  | "firmwareDownloading"
  | "firmwareInstalling"
  | "allSuccess"
  | "200Success"
  | "otaUpdateSuccess"
  | "scanningFail"
  | "connectingFail"
  | "retrieveFail"
  | "devEUIFail"
  | "downloadingFail"
  | "installingFail"
  | "startNotificationFail"
  | "notificationFail";

interface IState {
  currentRouteName: string;
  currentTabName: string;
  notification: string;
  page: number;
  totalPage: number;
  bleStatus: BleStatus;
}

const initialState: IState = {
  currentRouteName: "",
  currentTabName: "",
  notification: "",
  page: 0,
  totalPage: 0,
  bleStatus: "before",
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentRouteName: (state, { payload }: PayloadAction<string>) => {
      state.currentRouteName = payload;
    },
    setCurrentTabName: (state, { payload }: PayloadAction<string>) => {
      state.currentTabName = payload;
    },
    setNotification: (state, { payload }: PayloadAction<string>) => {
      state.notification = payload;
    },
    setPage: (state, { payload }: PayloadAction<"next" | "prev" | "init">) => {
      if (payload === "next") {
        state.page++;
      } else if (payload === "prev") {
        state.page--;
      } else {
        state.page = 1;
      }
    },
    setTotalPage: (state, { payload }: PayloadAction<number>) => {
      state.totalPage = payload;
    },
    setBleStatus: (state, { payload }: PayloadAction<BleStatus>) => {
      state.bleStatus = payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
