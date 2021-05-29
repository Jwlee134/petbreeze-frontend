import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  savedPost: boolean;
  myPost: boolean;
  mySurrounding: boolean;
}

const initialState: IState = {
  savedPost: false,
  myPost: false,
  mySurrounding: false,
};

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setSavedPost: (state, action: PayloadAction<boolean>) => {
      state.savedPost = action.payload;
    },
    setMyPost: (state, action: PayloadAction<boolean>) => {
      state.myPost = action.payload;
    },
    setMySurrounding: (state, action: PayloadAction<boolean>) => {
      state.mySurrounding = action.payload;
    },
  },
});

export const notificationActions = { ...notification.actions };

export default notification.reducer;
