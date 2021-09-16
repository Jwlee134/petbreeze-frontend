import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAndroid } from "~/utils";

interface IInit {
  isCodePushUpdated: boolean;
  isIntroPassed: boolean;
  isPermissionAllowed: boolean;
  isInitialized: boolean;
}

interface IDevice {
  isOtaUpdateAvailable: boolean;
  isDeviceRegistered: boolean;
  isSafetyZoneRegistered: boolean;
  isProfileRegistered: boolean;
  deviceId: string;
  safetyZoneName: string;
  redirectionRouteName: "StartWalking" | "MyPage" | "";
}

interface IWalk {
  selectedDeviceId: string[];
  trackingId: number | null;
  duration: number;
  coords: number[][];
  meter: number;
  isWalking: boolean;
  startTime: string;
  isStopped: boolean;
  currentPauseTime: string;
  totalPauseDuration: number;
}

interface IHistory {
  safetyZoneSearch: { addr: string; latitude: number; longitude: number }[];
}

interface IStorage {
  lastCoord: {
    latitude: number;
    longitude: number;
  };
  init: IInit;
  device: IDevice;
  walk: IWalk;
  history: IHistory;
}

const initialState: IStorage = {
  lastCoord: {
    latitude: 0,
    longitude: 0,
  },
  init: {
    isCodePushUpdated: false,
    isPermissionAllowed: isAndroid ? true : false,
    isIntroPassed: false,
    isInitialized: false,
  },
  device: {
    isOtaUpdateAvailable: false,
    isDeviceRegistered: false,
    isSafetyZoneRegistered: false,
    isProfileRegistered: false,
    deviceId: "1",
    safetyZoneName: "",
    redirectionRouteName: "",
  },
  walk: {
    selectedDeviceId: [],
    trackingId: null,
    duration: 0,
    coords: [],
    meter: 0,
    isWalking: false,
    startTime: "",
    isStopped: false,
    currentPauseTime: "",
    totalPauseDuration: 0,
  },
  history: {
    safetyZoneSearch: [],
  },
};

const storage = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setInit: (state, { payload }: PayloadAction<Partial<IInit>>) => {
      state.init = { ...state.init, ...payload };
    },

    setDevice: (state, { payload }: PayloadAction<Partial<IDevice> | null>) => {
      if (payload) {
        state.device = { ...state.device, ...payload };
      } else {
        state.device = initialState.device;
      }
    },

    setWalk: (state, { payload }: PayloadAction<Partial<IWalk> | null>) => {
      if (payload) {
        state.walk = { ...state.walk, ...payload };
      } else {
        state.walk = { ...initialState.walk, isStopped: state.walk.isStopped };
      }
    },
    setCoords: (
      state,
      { payload }: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.walk.coords.push([payload.latitude, payload.longitude]);
    },
    setTotalPauseDuration: (state, { payload }: PayloadAction<number>) => {
      state.walk.totalPauseDuration = state.walk.totalPauseDuration + payload;
    },
    setMeter: (state, { payload }: PayloadAction<number>) => {
      state.walk.meter = state.walk.meter + payload;
    },

    setSafetyZoneSearchHistory: (
      state,
      {
        payload,
      }: PayloadAction<{
        addr: string;
        latitude: number;
        longitude: number;
      } | null>,
    ) => {
      if (!payload) {
        state.history.safetyZoneSearch = [];
        return;
      }
      const exist = state.history.safetyZoneSearch.some(
        data => data.addr === payload.addr,
      );
      if (!exist) {
        state.history.safetyZoneSearch = [
          payload,
          ...state.history.safetyZoneSearch,
        ];
      }
    },
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
