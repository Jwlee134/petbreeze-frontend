import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  currentRouteName: string;
  currentTabName: string;
}

const initialState: IState = {
  currentRouteName: "",
  currentTabName: "",
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentRouteName: (state, action: PayloadAction<string>) => {
      state.currentRouteName = action.payload;
    },
    setCurrentTabName: (state, action: PayloadAction<string>) => {
      state.currentTabName = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
