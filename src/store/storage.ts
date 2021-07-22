import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Camera } from "react-native-maps";
import { isAndroid } from "~/utils";

interface IStorage {
  notifications: {
    mySurrounding: boolean;
  };
  camera: Camera;
  user: {
    token: string;
    nickname: string;
  };
  initialization: {
    isCodePushUpdated: boolean;
    isPermissionAllowed: boolean;
    isDeviceRegistered: boolean;
    isSafetyZoneRegistered: boolean;
    isPetProfileRegistered: boolean;
    isInitialized: boolean;
  };
  device: {
    isOtaUpdateAvailable: boolean;
  };
  walk: {
    didMountInitially: boolean;
    duration: number;
    coords: number[][];
    meter: number;
    isWalking: boolean;
    startTime: string;
  };
}

const initialState: IStorage = {
  notifications: {
    mySurrounding: true,
  },
  camera: {
    center: {
      latitude: 35.95,
      longitude: 128.25,
    },
    altitude: 0,
    heading: 0,
    pitch: 0,
    zoom: 6,
  },
  user: {
    token: "",
    nickname: "",
  },
  initialization: {
    isCodePushUpdated: false,
    isPermissionAllowed: isAndroid ? true : false,
    isDeviceRegistered: false,
    isSafetyZoneRegistered: false,
    isPetProfileRegistered: false,
    isInitialized: false,
  },
  device: {
    isOtaUpdateAvailable: false,
  },
  walk: {
    didMountInitially: true,
    duration: 0,
    coords: [],
    meter: 0,
    isWalking: false,
    startTime: "",
  },
};

const storage = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setMySurrounding: (state, { payload }: PayloadAction<boolean>) => {
      state.notifications.mySurrounding = payload;
    },
    setCamera: (state, { payload }: PayloadAction<Camera>) => {
      state.camera = payload;
    },
    login: (
      state,
      { payload }: PayloadAction<{ token: string; nickname: string }>,
    ) => {
      state.user.token = payload.token;
      state.user.nickname = payload.nickname;
    },
    setInitialization: (
      state,
      {
        payload,
      }: PayloadAction<
        | "permission"
        | "device"
        | "safetZone"
        | "petProfile"
        | "initialization"
        | "codePush"
      >,
    ) => {
      switch (payload) {
        case "permission":
          state.initialization.isPermissionAllowed = true;
          break;
        case "device":
          state.initialization.isDeviceRegistered = true;
          break;
        case "safetZone":
          state.initialization.isSafetyZoneRegistered = true;
          break;
        case "petProfile":
          state.initialization.isPetProfileRegistered = true;
          break;
        case "initialization":
          state.initialization.isInitialized = true;
          break;
        case "codePush":
          state.initialization.isCodePushUpdated = true;
          break;
      }
    },
    logout: state => {
      state.user.token = "";
      state.user.nickname = "";
    },
    setIsOtaUpdateAvailable: (state, { payload }: PayloadAction<boolean>) => {
      state.device.isOtaUpdateAvailable = payload;
    },
    setDidMountInitially: (state, { payload }: PayloadAction<boolean>) => {
      state.walk.didMountInitially = payload;
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
    setIsWalking: (state, { payload }: PayloadAction<boolean>) => {
      state.walk.isWalking = payload;
    },
    setMeter: (state, { payload }: PayloadAction<number>) => {
      state.walk.meter = payload;
    },
    setStartTime: (state, { payload }: PayloadAction<string>) => {
      state.walk.startTime = payload;
    },
    clearWalk: state => {
      state.walk = initialState.walk;
    },
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
