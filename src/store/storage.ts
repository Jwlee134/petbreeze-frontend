import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAndroid } from "~/utils";

interface Init {
  isCodePushUpdated: boolean;
  isIntroPassed: boolean;
  isPermissionAllowed: boolean;
}

interface Walk {
  selectedDeviceId: number[];
  trackingId: number | null;
  duration: number;
  coords: number[][];
  meter: number;
  isWalking: boolean;
  startTime: string;
  isStopped: boolean;
  currentPauseTime: string;
  totalPauseDuration: number;
  sheetIndex: number;
}

interface History {
  safetyZoneSearch: { address: string; latitude: number; longitude: number }[];
}

interface State {
  numOfDevice: number;
  lastCoord: {
    latitude: number;
    longitude: number;
  };
  init: Init;
  walk: Walk;
  history: History;
}

const initialState: State = {
  numOfDevice: 0,
  lastCoord: {
    latitude: 0,
    longitude: 0,
  },
  init: {
    isCodePushUpdated: false,
    isPermissionAllowed: isAndroid,
    isIntroPassed: false,
  },
  walk: {
    selectedDeviceId: [],
    trackingId: null,
    duration: 0,
    coords: [],
    meter: 0,
    isWalking: false,
    startTime: "",
    isStopped: false,
    currentPauseTime: "",
    totalPauseDuration: 0,
    sheetIndex: 0,
  },
  history: {
    safetyZoneSearch: [],
  },
};

const storage = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setInit: (state, { payload }: PayloadAction<Partial<Init>>) => {
      state.init = { ...state.init, ...payload };
    },

    setLastCoord: (
      state,
      { payload }: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.lastCoord = payload;
    },

    setNumOfDevice: (state, { payload }: PayloadAction<number>) => {
      state.numOfDevice = payload;
    },

    setWalk: (state, { payload }: PayloadAction<Partial<Walk> | null>) => {
      if (payload) {
        state.walk = { ...state.walk, ...payload };
      } else {
        state.walk = initialState.walk;
      }
    },
    setCoords: (
      state,
      { payload }: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.walk.coords.push([payload.longitude, payload.latitude]);
    },
    setTotalPauseDuration: (state, { payload }: PayloadAction<number>) => {
      state.walk.totalPauseDuration += payload;
    },
    setMeter: (state, { payload }: PayloadAction<number>) => {
      state.walk.meter += payload;
    },

    setSafetyZoneSearchHistory: (
      state,
      {
        payload,
      }: PayloadAction<{
        address: string;
        latitude: number;
        longitude: number;
      } | null>,
    ) => {
      if (!payload) {
        state.history.safetyZoneSearch = [];
        return;
      }
      const exist = state.history.safetyZoneSearch.some(
        data => data.address === payload.address,
      );
      if (!exist) {
        if (state.history.safetyZoneSearch.length === 10) {
          state.history.safetyZoneSearch.splice(-1, 1);
        }
        state.history.safetyZoneSearch = [
          payload,
          ...state.history.safetyZoneSearch,
        ];
      }
    },

    reset: state => ({ ...initialState, init: state.init }),
  },
});

export const storageActions = { ...storage.actions };

export default storage.reducer;
