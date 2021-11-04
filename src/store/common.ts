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
  deleteAccount: {
    body: (string | number)[];
    text: string;
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
  deleteAccount: {
    body: [],
    text: "",
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

    setDeleteAccount: (
      state,
      {
        payload,
      }: PayloadAction<
        Partial<{
          body: (string | number)[];
          text: string;
        } | null>
      >,
    ) => {
      if (payload) {
        state.deleteAccount = { ...state.deleteAccount, ...payload };
      } else {
        state.deleteAccount = initialState.deleteAccount;
      }
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
