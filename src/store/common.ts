import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  address: string;
  deviceCoord: { latitude: number; longitude: number; time: string };
  areaRadius: number;
  showDeviceLocation: boolean;
  isDeviceMoved: boolean;
  isPressed: boolean;
  pressedID: number;
}

interface DeleteAccountState {
  body: (string | number)[];
  text: string;
}

interface State {
  home: HomeState;
  deleteAccount: DeleteAccountState;
  isBleManagerInitialized: boolean;
  isTokenInvalid: boolean;
}

const initialState: State = {
  home: {
    address: "",
    deviceCoord: { latitude: 0, longitude: 0, time: "" },
    areaRadius: 0,
    showDeviceLocation: false,
    isDeviceMoved: true,
    isPressed: false,
    pressedID: 0,
  },
  deleteAccount: {
    body: [],
    text: "",
  },
  isBleManagerInitialized: false,
  isTokenInvalid: false,
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHome: (state, { payload }: PayloadAction<Partial<HomeState> | null>) => {
      if (payload) {
        state.home = { ...state.home, ...payload };
      } else {
        state.home = initialState.home;
      }
    },
    setDeleteAccount: (
      state,
      { payload }: PayloadAction<Partial<DeleteAccountState | null>>,
    ) => {
      if (payload) {
        state.deleteAccount = { ...state.deleteAccount, ...payload };
      } else {
        state.deleteAccount = initialState.deleteAccount;
      }
    },
    setIsBleManagerInitialized: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isBleManagerInitialized = payload;
    },
    setIsTokenInvalid: (state, { payload }: PayloadAction<boolean>) => {
      state.isTokenInvalid = payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
