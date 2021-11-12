import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BleStatus =
  | ""
  | "scanning"
  | "connected"
  | "downloadingFirmware"
  | "installingFirmware"
  | "relationAdded"
  | "otaUpdateSuccess"
  | "scanningFail"
  | "connectingFail"
  | "retrieveSuccess"
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
  | "safetyZoneDone";

interface IState {
  status: BleStatus;
  progress: number;
  isOtaUpdate: boolean;
  disconnected: boolean;
  deviceID: number;
}

const initialState: IState = {
  status: "",
  progress: 0,
  isOtaUpdate: false,
  disconnected: true,
  deviceID: 0,
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
    setDisconnected: (state, { payload }: PayloadAction<boolean>) => {
      state.disconnected = payload;
    },
    setDeviceID: (state, { payload }: PayloadAction<number>) => {
      state.deviceID = payload;
    },
    reset: () => initialState,
  },
});

export const bleActions = { ...ble.actions };

export default ble.reducer;
