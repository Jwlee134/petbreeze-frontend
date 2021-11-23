import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  address: string;
  deviceCoord: {
    latitude: number;
    longitude: number;
  };
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
  animateSwipeable: boolean;
}

const initialState: State = {
  home: {
    address: "",
    deviceCoord: {
      latitude: 0,
      longitude: 0,
    },
    isDeviceMoved: true,
    isPressed: false,
    pressedID: 0,
  },
  deleteAccount: {
    body: [],
    text: "",
  },
  animateSwipeable: false,
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
    setAnimateSwipeable: (state, { payload }: PayloadAction<boolean>) => {
      state.animateSwipeable = payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
