import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAndroid } from "~/utils";

interface IStorage {
  notifications: {
    mySurrounding: boolean;
  };
  coord: {
    latitude: number;
    longitude: number;
  };
  user: {
    token: string;
    nickname: string;
  };
  init: {
    isCodePushUpdated: boolean;
    isIntroPassed: boolean;
    isPermissionAllowed: boolean;
    isInitialized: boolean;
  };
  device: {
    isOtaUpdateAvailable: boolean;
    isDeviceRegistered: boolean;
    isSafetyZoneRegistered: boolean;
    isProfileRegistered: boolean;
    deviceIdInProgress: string;
    redirectionRouteName: string;
  };
  walk: {
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
  };
  history: {
    safetyZoneSearch: { addr: string; latitude: number; longitude: number }[];
  };
}

const initialState: IStorage = {
  notifications: {
    mySurrounding: true,
  },
  coord: {
    latitude: 37.564362,
    longitude: 126.977011,
  },
  user: {
    token: "",
    nickname: "",
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
    deviceIdInProgress: "1",
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
    setMySurrounding: (state, { payload }: PayloadAction<boolean>) => {
      state.notifications.mySurrounding = payload;
    },
    setCoord: (
      state,
      { payload }: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.coord = payload;
    },
    login: (
      state,
      { payload }: PayloadAction<{ token: string; nickname: string }>,
    ) => {
      state.user.token = payload.token;
      state.user.nickname = payload.nickname;
    },
    setInit: (
      state,
      { payload }: PayloadAction<"permission" | "init" | "codePush" | "intro">,
    ) => {
      switch (payload) {
        case "permission":
          state.init.isPermissionAllowed = true;
          break;
        case "init":
          state.init.isInitialized = true;
          break;
        case "codePush":
          state.init.isCodePushUpdated = true;
          break;
        case "intro":
          state.init.isIntroPassed = true;
          break;
      }
    },
    setDeviceRegistrationStep: (
      state,
      { payload }: PayloadAction<"device" | "safetyZone" | "profile" | "ota">,
    ) => {
      switch (payload) {
        case "device":
          state.device.isDeviceRegistered = true;
          break;
        case "safetyZone":
          state.device.isSafetyZoneRegistered = true;
          break;
        case "profile":
          state.device.isProfileRegistered = true;
          break;
        case "ota":
          state.device.isOtaUpdateAvailable = true;
          break;
      }
    },
    setDeviceId: (state, { payload }: PayloadAction<string>) => {
      state.device.deviceIdInProgress = payload;
    },
    initDeviceRegistrationStep: state => {
      state.device = {
        ...initialState.device,
        redirectionRouteName: state.device.redirectionRouteName,
      };
    },
    setRedirectionRouteName: (state, { payload }: PayloadAction<string>) => {
      state.device.redirectionRouteName = payload;
    },
    logout: state => {
      state.user = initialState.user;
      state.init.isInitialized = false;
      state.init.isPermissionAllowed = false;
    },
    setSelectedDeviceId: (state, { payload }: PayloadAction<string[]>) => {
      state.walk.selectedDeviceId = payload;
    },
    setTrackingId: (state, { payload }: PayloadAction<number>) => {
      state.walk.trackingId = payload;
    },
    setDuration: (state, { payload }: PayloadAction<number>) => {
      state.walk.duration = payload;
    },
    setCoords: (
      state,
      { payload }: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.walk.coords.push([payload.latitude, payload.longitude]);
    },
    spliceCoords: state => {
      state.walk.coords.splice(-1);
    },
    setIsWalking: (state, { payload }: PayloadAction<boolean>) => {
      state.walk.isWalking = payload;
    },
    setMeter: (state, { payload }: PayloadAction<number>) => {
      state.walk.meter = state.walk.meter + payload;
    },
    setStartTime: (state, { payload }: PayloadAction<string>) => {
      state.walk.startTime = payload;
    },
    setIsStopped: (state, { payload }: PayloadAction<boolean>) => {
      state.walk.isStopped = payload;
    },
    setCurrentPauseTime: (state, { payload }: PayloadAction<string>) => {
      state.walk.currentPauseTime = payload;
    },
    setTotalPauseDuration: (state, { payload }: PayloadAction<number>) => {
      state.walk.totalPauseDuration = state.walk.totalPauseDuration + payload;
    },
    clearWalk: state => {
      state.walk = { ...initialState.walk, isStopped: state.walk.isStopped };
    },
    setSafetyZoneSearchHistory: (
      state,
      {
        payload,
      }: PayloadAction<{ addr: string; latitude: number; longitude: number }[]>,
    ) => {
      state.history.safetyZoneSearch = payload;
    },
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
