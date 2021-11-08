import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  address: string;
  deviceCoord: {
    latitude: number;
    longitude: number;
  };
  isDeviceMoved: boolean;
  pressedID: number;
  longPressedID: number;
}

interface DeleteAccountState {
  body: (string | number)[];
  text: string;
}

interface State {
  home: HomeState;
  deleteAccount: DeleteAccountState;
}

const initialState: State = {
  home: {
    address: "",
    deviceCoord: {
      latitude: 0,
      longitude: 0,
    },
    isDeviceMoved: true,
    pressedID: 0,
    longPressedID: 0,
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
    setHome: (state, { payload }: PayloadAction<Partial<HomeState>>) => {
      state.home = { ...state.home, ...payload };
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
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
