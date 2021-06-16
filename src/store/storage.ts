import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Camera } from "react-native-maps";

export interface ISafetyZone {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  distanceLabel: string;
  distanceValue: number;
}

interface IState {
  notifications: {
    savedPost: boolean;
    myPost: boolean;
    mySurrounding: boolean;
  };
  camera: Camera;
  safetyZone: ISafetyZone[];
}

const initialState: IState = {
  notifications: {
    savedPost: true,
    myPost: true,
    mySurrounding: true,
  },
  camera: {
    center: {
      latitude: 37.5666805,
      longitude: 126.9784147,
    },
    altitude: 0,
    heading: 0,
    pitch: 0,
    zoom: 15,
  },
  safetyZone: [],
};

const storage = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setSavedPost: (state, action: PayloadAction<boolean>) => {
      state.notifications.savedPost = action.payload;
    },
    setMyPost: (state, action: PayloadAction<boolean>) => {
      state.notifications.myPost = action.payload;
    },
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
        latitude: number;
        longitude: number;
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
        state.safetyZone[state.safetyZone.findIndex(item => item.id === id)] = {
          ...action.payload,
        };
      }
    },
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
