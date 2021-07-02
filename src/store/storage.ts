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
    isLoggedIn: boolean;
    token: string;
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
    isLoggedIn: false,
    token: "",
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
    login: (state, { payload }: PayloadAction<string>) => {
      state.user.isLoggedIn = true;
      state.user.token = payload;
    },
    logout: state => {
      state.user.isLoggedIn = false;
      state.user.token = "";
    },
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
