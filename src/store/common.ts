import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoginRequiredRouteName =
  | "Home"
  | "Location"
  | "Notification"
  | "MyMenu"
  | "PostAnimalInfo";

interface IState {
  currentRouteName: LoginRequiredRouteName;
  currentHomeTab: "LostList" | "WitnessedList";
}

const initialState: IState = {
  currentRouteName: "Home",
  currentHomeTab: "LostList",
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentRouteName: (
      state,
      action: PayloadAction<LoginRequiredRouteName>,
    ) => {
      state.currentRouteName = action.payload;
    },
    setCurrentHomeTab: (
      state,
      action: PayloadAction<"LostList" | "WitnessedList">,
    ) => {
      state.currentHomeTab = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
