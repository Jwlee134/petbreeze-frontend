import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  currentRouteName: string;
  currentTabName: string;
  notification: string;
  page: number;
}

const initialState: IState = {
  currentRouteName: "",
  currentTabName: "",
  notification: "",
  page: 0,
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentRouteName: (state, { payload }: PayloadAction<string>) => {
      state.currentRouteName = payload;
    },
    setCurrentTabName: (state, { payload }: PayloadAction<string>) => {
      state.currentTabName = payload;
    },
    setNotification: (state, { payload }: PayloadAction<string>) => {
      state.notification = payload;
    },
    setPage: (state, { payload }: PayloadAction<"next" | "prev">) => {
      if (payload === "next") {
        state.page++;
      } else {
        state.page--;
      }
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
