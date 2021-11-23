import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AreaResponse, WiFiBody } from "~/api/device";

interface SafetyZoneDraft {
  name: string;
  address: string;
  thumbnail: string;
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
  result: AreaResponse[];
  draft: T;
}

interface WifiDraft {
  ssid: string;
  password: string;
}

interface Wifi<T> {
  currentId: number;
  result: WiFiBody[];
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
      safety_area_id: i,
      name: null,
      address: null,
      thumbnail: "",
      coordinate: {
        type: "Point",
        coordinates: [0, 0],
      },
      radius: 0,
    })),
    draft: {
      name: "",
      address: "",
      thumbnail: "",
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
      wifi_id: i,
      ssid: null,
      password: null,
    })),
    draft: {
      ssid: "",
      password: "",
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
        thumbnail,
        radius,
      } = payload;
      state.safetyZone.result = state.safetyZone.result.map(data => {
        if (data.safety_area_id === currentId) {
          return {
            safety_area_id: currentId,
            name,
            address,
            thumbnail,
            coordinate: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            radius,
          };
        }
        return data;
      });
    },
    deleteSafetyZone: (state, { payload }: PayloadAction<number>) => {
      state.safetyZone.result = state.safetyZone.result.map(area => {
        if (area.safety_area_id === payload) {
          return {
            ...area,
            name: null,
            address: null,
            coordinate: {
              type: "Point",
              coordinates: [0, 0],
            },
            radius: 0,
          };
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
      state.wifi.result = state.wifi.result.map(data => {
        if (data.wifi_id === currentId) {
          return { wifi_id: currentId, ...payload };
        }
        return data;
      });
    },
    deleteWiFi: (state, { payload }: PayloadAction<number>) => {
      state.wifi.result = state.wifi.result.map(wifi => {
        if (wifi.wifi_id === payload) {
          return { ...wifi, ssid: null, password: null };
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
