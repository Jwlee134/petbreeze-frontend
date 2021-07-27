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
    isInitialized: boolean;
  };
  device: {
    isOtaUpdateAvailable: boolean;
    isDeviceRegistered: boolean;
    isSafetyZoneRegistered: boolean;
    isProfileRegistered: boolean;
    deviceIdInProgress: string;
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
    isInitialized: false,
  },
  device: {
    isOtaUpdateAvailable: false,
    isDeviceRegistered: false,
    isSafetyZoneRegistered: false,
    isProfileRegistered: false,
    deviceIdInProgress: "1",
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
      { payload }: PayloadAction<"permission" | "initialization" | "codePush">,
    ) => {
      switch (payload) {
        case "permission":
          state.initialization.isPermissionAllowed = true;
          break;
        case "initialization":
          state.initialization.isInitialized = true;
          break;
        case "codePush":
          state.initialization.isCodePushUpdated = true;
          break;
      }
    },
    setDeviceRegistrationStep: (
      state,
      {
        payload,
      }: PayloadAction<
        "device" | "safetyZone" | "profile" | "ota" | { id: string }
      >,
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
        default:
          state.device.deviceIdInProgress = payload.id;
          break;
      }
    },
    initDeviceRegistrationStep: state => {
      state.device = initialState.device;
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
    spliceCoords: state => {
      state.walk.coords.splice(-1);
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
