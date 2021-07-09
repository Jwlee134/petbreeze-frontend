import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Camera } from "react-native-maps";

export interface ISafetyZone {
  id: number;
  camera: Camera;
  name: string;
  distanceLabel: string;
  distanceValue: number;
}

interface IStorage {
  notifications: {
    mySurrounding: boolean;
  };
  camera: Camera;
  safetyZone: ISafetyZone[];
  user: {
    token: string;
    nickname: string;
  };
  initialization: {
    isPermissionAllowed: boolean;
    isDeviceRegistered: boolean;
    isSafetyZoneRegistered: boolean;
    isPetProfileRegistered: boolean;
    isInitialized: boolean;
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
  safetyZone: [],
  user: {
    token: "",
    nickname: "",
  },
  initialization: {
    isPermissionAllowed: false,
    isDeviceRegistered: false,
    isSafetyZoneRegistered: false,
    isPetProfileRegistered: false,
    isInitialized: false,
  },
};

const storage = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setMySurrounding: (state, action: PayloadAction<boolean>) => {
      state.notifications.mySurrounding = action.payload;
    },
    setCamera: (state, action: PayloadAction<Camera>) => {
      state.camera = action.payload;
    },
    updateSafetyZone: (
      state,
      action: PayloadAction<{
        id: number;
        camera: Camera;
        name: string;
        distanceLabel: string;
        distanceValue: number;
      }>,
    ) => {
      const { id } = action.payload;
      if (!id) {
        state.safetyZone.push({
          ...action.payload,
          id: state.safetyZone[state.safetyZone.length - 1]?.id + 1 || 1,
        });
      } else {
        state.safetyZone[state.safetyZone.findIndex(item => item.id === id)] =
          action.payload;
      }
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
        "permission" | "device" | "safetZone" | "petProfile" | "initialization"
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
      }
    },
    logout: state => {
      state.user.token = "";
      state.user.nickname = "";
    },
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
