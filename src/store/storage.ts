import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Camera } from "react-native-maps";

interface IState {
  notifications: {
    savedPost: boolean;
    myPost: boolean;
    mySurrounding: boolean;
  };
  camera: Camera;
}

const initialState: IState = {
  notifications: {
    savedPost: false,
    myPost: false,
    mySurrounding: false,
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
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
