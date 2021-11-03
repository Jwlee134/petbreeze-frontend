import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  home: {
    address: string;
    deviceCoord: {
      latitude: number;
      longitude: number;
    };
    isDeviceMoved: boolean;
    clickedID: number;
  };
  walk: {
    dateOfDeletedRecord: string;
  };
}

const initialState: IState = {
  home: {
    address: "",
    deviceCoord: {
      latitude: 0,
      longitude: 0,
    },
    isDeviceMoved: true,
    clickedID: 0,
  },
  walk: {
    dateOfDeletedRecord: "",
  },
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAddress: (state, { payload }: PayloadAction<string>) => {
      state.home.address = payload;
    },
    setIsDeviceMoved: (state, { payload }: PayloadAction<boolean>) => {
      state.home.isDeviceMoved = payload;
    },
    setDeviceCoord: (
      state,
      { payload }: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.home.deviceCoord = payload;
    },
    setClickedID: (state, { payload }: PayloadAction<number>) => {
      state.home.clickedID = payload;
    },
    setDateOfDeleteRecord: (state, { payload }: PayloadAction<string>) => {
      state.walk.dateOfDeletedRecord = payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
