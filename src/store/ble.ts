import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BleStatus =
  | "before"
  | "scanning"
  | "scanningSuccess"
  | "downloadingFirmware"
  | "installingFirmware"
  | "200Success"
  | "otaUpdateSuccess"
  | "scanningFail"
  | "connectingFail"
  | "retrieveFail"
  | "devEUIFail"
  | "downloadingFail"
  | "installingFail"
  | "startNotificationFail"
  | "notificationFail"
  | "connectingToWifi"
  | "wifiSuccess"
  | "wifiFail"
  | "sendingSafetyZone"
  | "safetyZoneSuccess"
  | "safetyZoneFail";

interface IState {
  status: BleStatus;
  progress: number;
  isOtaUpdate: boolean;
}

const initialState: IState = {
  status: "before",
  progress: 0,
  isOtaUpdate: false,
};

const ble = createSlice({
  name: "ble",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<BleStatus>) => {
      state.status = payload;
    },
    setProgress: (state, { payload }: PayloadAction<number>) => {
      state.progress = payload;
    },
    setIsOtaUpdate: (state, { payload }: PayloadAction<boolean>) => {
      state.isOtaUpdate = payload;
    },
  },
});

export const bleActions = { ...ble.actions };

export default ble.reducer;
