import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BleRootStackNavParamList,
  BleWithHeaderStackNavParamList,
  BleWithoutHeaderStackNavParamList,
  BottomTabParamList,
  LoggedInNavParamList,
  SharedStackNavParamList,
  WalkTopTabParamList,
} from "~/types/navigator";

interface IState {
  initialLoggedInNavRouteName: keyof LoggedInNavParamList;
  initialBleRootStackNavRouteName: keyof BleRootStackNavParamList;
  initialBleWithHeaderStackNavRouteName: keyof BleWithHeaderStackNavParamList;
  initialBleWithoutHeaderStackNavRouteName: keyof BleWithoutHeaderStackNavParamList;
  initialBottomTabNavRouteName: keyof BottomTabParamList;
  initialSharedStackNavRouteName: keyof SharedStackNavParamList;
  initialWalkTopTabNavRouteName: keyof WalkTopTabParamList;
  loadingText: string;
}

const initialState: IState = {
  initialLoggedInNavRouteName: "BottomTabNav",
  initialBleRootStackNavRouteName: "BleWithHeaderStackNav",
  initialBleWithHeaderStackNavRouteName: "ChargingCheck",
  initialBleWithoutHeaderStackNavRouteName: "Scanning",
  initialBottomTabNavRouteName: "HomeTab",
  initialSharedStackNavRouteName: "Home",
  initialWalkTopTabNavRouteName: "StartWalking",
  loadingText: "",
};

const navigator = createSlice({
  name: "navigator",
  initialState,
  reducers: {
    setInitialRoute: (state, { payload }: PayloadAction<Partial<IState>>) => ({
      ...state,
      ...payload,
    }),
    setLoadingText: (state, { payload }: PayloadAction<string>) => {
      state.loadingText = payload;
    },
    reset: () => initialState,
  },
});

export const navigatorActions = { ...navigator.actions };

export default navigator.reducer;
