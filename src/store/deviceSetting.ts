import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SafetyZoneResult {
  id: number;
  name: string;
  address: string;
  data: number[];
  image: string;
}

interface SafetyZoneDraft {
  name: string;
  address: string;
  image: string;
  coord: {
    latitude: number;
    longitude: number;
  };
  radius: number;
}

interface SafetyZone<T> {
  step2: boolean;
  animateCamera: boolean;
  isSearchMode: boolean;
  isSubmitting: boolean;
  fromDeviceSetting: boolean;
  currentId: number;
  result: SafetyZoneResult[];
  draft: T;
}

interface WifiDraft {
  ssid: string;
  pw: string;
}

interface WifiResult extends WifiDraft {
  id: number;
}

interface Wifi<T> {
  currentId: number;
  result: WifiResult[];
  draft: T;
}

interface State {
  period: number | null;
  safetyZone: SafetyZone<SafetyZoneDraft>;
  wifi: Wifi<WifiDraft>;
}

const initialState: State = {
  period: null,
  safetyZone: {
    step2: false,
    animateCamera: false,
    isSearchMode: false,
    isSubmitting: false,
    fromDeviceSetting: false,
    currentId: 0,
    result: Array.from({ length: 3 }, (v, i) => ({
      id: i,
      name: "",
      address: "",
      image: "",
      data: [0, 0, 0],
    })),
    draft: {
      name: "",
      address: "",
      image: "",
      coord: {
        latitude: 0,
        longitude: 0,
      },
      radius: 10,
    },
  },
  wifi: {
    currentId: 0,
    result: Array.from({ length: 5 }, (v, i) => ({
      id: i,
      ssid: "",
      pw: "",
    })),
    draft: {
      ssid: "",
      pw: "",
    },
  },
};

const deviceSetting = createSlice({
  name: "deviceSetting",
  initialState,
  reducers: {
    setPeriod: (state, { payload }: PayloadAction<number>) => {
      state.period = payload;
    },

    setSafetyZone: (
      state,
      {
        payload,
      }: PayloadAction<Partial<SafetyZone<Partial<SafetyZoneDraft>>> | null>,
    ) => {
      if (payload) {
        state.safetyZone = {
          ...state.safetyZone,
          ...payload,
          draft: { ...state.safetyZone.draft, ...payload?.draft },
        };
      } else {
        state.safetyZone = {
          ...initialState.safetyZone,
          result: state.safetyZone.result,
        };
      }
    },
    updateSafetyZoneResult: (
      state,
      { payload }: PayloadAction<SafetyZoneDraft>,
    ) => {
      const { currentId } = state.safetyZone;
      const {
        name,
        address,
        coord: { latitude, longitude },
        image,
        radius,
      } = payload;
      state.safetyZone.result = state.safetyZone.result.filter(
        data => data.id !== currentId,
      );
      state.safetyZone.result.push({
        id: currentId,
        name,
        address,
        image,
        data: [latitude, longitude, radius],
      });
    },
    deleteSafetyZone: (state, { payload }: PayloadAction<number>) => {
      state.safetyZone.result = state.safetyZone.result.map(area => {
        if (area.id === payload) {
          return { ...area, name: "", address: "", data: [0, 0, 0], image: "" };
        }
        return area;
      });
    },

    setWifi: (
      state,
      { payload }: PayloadAction<Partial<Wifi<Partial<WifiDraft>>> | null>,
    ) => {
      if (payload) {
        state.wifi = {
          ...state.wifi,
          ...payload,
          draft: { ...state.wifi.draft, ...payload?.draft },
        };
      } else {
        state.wifi = { ...initialState.wifi, result: state.wifi.result };
      }
    },
    updateWifiResult: (state, { payload }: PayloadAction<WifiDraft>) => {
      const { currentId } = state.wifi;
      state.wifi.result = state.wifi.result.filter(
        data => data.id !== currentId,
      );
      state.wifi.result.push({ id: currentId, ...payload });
    },
    deleteWiFi: (state, { payload }: PayloadAction<number>) => {
      state.wifi.result = state.wifi.result.map(wifi => {
        if (wifi.id === payload) {
          return { ...wifi, ssid: "", pw: "" };
        }
        return wifi;
      });
    },

    reset: () => initialState,
    resetResults: state => {
      state.period = initialState.period;
      state.safetyZone.result = initialState.safetyZone.result;
      state.wifi.result = initialState.wifi.result;
    },
  },
});

export const deviceSettingActions = { ...deviceSetting.actions };

export default deviceSetting.reducer;
