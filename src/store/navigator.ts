import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BleRootStackNavParamList,
  BleWithHeaderStackeNavParamList,
  BleWithoutHeaderStackNavParamList,
  BottomTabParamList,
  LoggedInNavParamList,
  SharedStackNavParamList,
  WalkTopTabParamList,
} from "~/types/navigator";

interface IState {
  initialLoggedInNavRouteName: keyof LoggedInNavParamList;
  initialBleRootStackNavRouteName: keyof BleRootStackNavParamList;
  initialBleWithHeaderStackNavRouteName: keyof BleWithHeaderStackeNavParamList;
  initialBleWithoutHeaderStackNavRouteName: keyof BleWithoutHeaderStackNavParamList;
  initialBottomTabNavRouteName: keyof BottomTabParamList;
  initialSharedStackNavRouteName: keyof SharedStackNavParamList;
  initialWalkTopTabNavRouteName: keyof WalkTopTabParamList;
  loadingText: string;
}

const initialState: IState = {
  initialLoggedInNavRouteName: "BottomTabNav",
  initialBleRootStackNavRouteName: "BleWithHeaderStackNav",
  initialBleWithHeaderStackNavRouteName: "DeviceCheck",
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
    setInitialRoute: (state, { payload }: PayloadAction<Partial<IState>>) => {
      state = { ...state, ...payload };
      return state;
    },
    setLoadingText: (state, { payload }: PayloadAction<string>) => {
      state.loadingText = payload;
    },
  },
});

export const navigatorActions = { ...navigator.actions };

export default navigator.reducer;
