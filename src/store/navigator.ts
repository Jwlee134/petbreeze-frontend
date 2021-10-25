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
  initialWalkRecordParams: {
    deviceID: number;
    date: string;
  };
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
  initialWalkRecordParams: {
    deviceID: 0,
    date: "",
  },
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
    setInitialWalkRecordParams: (
      state,
      { payload }: PayloadAction<{ id: number; date: string } | null>,
    ) => {
      if (payload) {
        state.initialWalkRecordParams.deviceID = payload.id;
        state.initialWalkRecordParams.date = payload.date;
      } else {
        state.initialWalkRecordParams = initialState.initialWalkRecordParams;
      }
    },
    setLoadingText: (state, { payload }: PayloadAction<string>) => {
      state.loadingText = payload;
    },
    reset: () => initialState,
  },
});

export const navigatorActions = { ...navigator.actions };

export default navigator.reducer;
