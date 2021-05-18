import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  currentRouteName: string;
  currentHomeTab: "Lost" | "Witnessed";
}

const initialState: IState = {
  currentRouteName: "",
  currentHomeTab: "Lost",
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentRouteName: (state, action: PayloadAction<string>) => {
      state.currentRouteName = action.payload;
    },
    setCurrentHomeTab: (state, action: PayloadAction<"Lost" | "Witnessed">) => {
      state.currentHomeTab = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
