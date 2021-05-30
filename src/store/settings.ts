import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  notifications: {
    savedPost: boolean;
    myPost: boolean;
    mySurrounding: boolean;
  };
  wifiSSID: { id: string; password: string }[];
}

const initialState: IState = {
  notifications: {
    savedPost: false,
    myPost: false,
    mySurrounding: false,
  },
  wifiSSID: [],
};

const settings = createSlice({
  name: "settings",
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
    setWifiSSID: (
      state,
      action: PayloadAction<{ id: string; password: string }[]>,
    ) => {
      state.wifiSSID = action.payload;
    },
  },
});

export const settingsActions = { ...settings.actions };

export default settings.reducer;
