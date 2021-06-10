import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isLoggedIn: boolean;
  token: string | null;
  isDeviceRegistered: boolean;
}

const initialState: IState = {
  isLoggedIn: false,
  token: null,
  isDeviceRegistered: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
    },
    setDeviceRegistered: state => {
      state.isDeviceRegistered = true;
    },
  },
});

export const userActions = { ...user.actions };

export default user.reducer;
