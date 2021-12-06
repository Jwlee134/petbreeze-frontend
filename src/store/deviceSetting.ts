import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AreaResponse, WiFiResponse } from "~/api/device";

interface AreaDraft {
  name: string;
  address: string;
  thumbnail: string;
  coord: { latitude: number; longitude: number };
  radius: number;
}

type WiFiDraft = Omit<WiFiResponse, "wifi_id">;

interface Area {
  step2: boolean;
  animateCamera: boolean;
  isSearchMode: boolean;
  isSubmitting: boolean;
  fromDeviceSetting: boolean;
  currentID: number;
}

interface State {
  area: Area;
  result: {
    Period: number;
    Area: AreaResponse[];
  };
  draft: {
    area: AreaDraft;
    wifi: WiFiDraft;
  };
}

const initialState: State = {
  area: {
    step2: false,
    animateCamera: false,
    isSearchMode: false,
    isSubmitting: false,
    fromDeviceSetting: false,
    currentID: 0,
  },
  result: {
    Period: 0,
    Area: Array.from({ length: 3 }, (v, i) => ({
      safety_area_id: i,
      name: null,
      address: null,
      thumbnail: null,
      coordinate: {
        type: "Point",
        coordinates: [0, 0],
      },
      radius: 0,
      WiFi: Array.from({ length: 3 }, (v, i) => ({
        wifi_id: i,
        ssid: null,
        password: null,
      })),
    })),
  },
  draft: {
    area: {
      name: "",
      address: "",
      thumbnail: "",
      coord: { latitude: 0, longitude: 0 },
      radius: 0,
    },
    wifi: { ssid: "", password: "" },
  },
};

const deviceSetting = createSlice({
  name: "deviceSetting",
  initialState,
  reducers: {
    setPeriod: (state, { payload }: PayloadAction<number>) => {
      state.result.Period = payload;
    },

    setArea: (state, { payload }: PayloadAction<Partial<Area>>) => {
      if (payload) {
        state.area = { ...state.area, ...payload };
      } else {
        state.area = initialState.area;
      }
    },

    setAreaResult: (state, { payload }: PayloadAction<AreaResponse[]>) => {
      state.result.Area = payload;
    },

    updateAreaResult: (state, { payload }: PayloadAction<AreaResponse>) => {},

    updateWiFiResult: (state, { payload }) => {},

    deleteAreaResult: (state, { payload }: PayloadAction<number>) => {
      const targetIndex = state.result.Area.findIndex(
        area => area.safety_area_id === payload,
      );
      state.result.Area[targetIndex] = initialState.result.Area[targetIndex];
    },

    deleteWiFiResult: (state, { payload }) => {},

    setAreaDraft: (state, { payload }: PayloadAction<Partial<AreaDraft>>) => {
      if (payload) {
        state.draft.area = { ...state.draft.area, ...payload };
      } else {
        state.draft.area = initialState.draft.area;
      }
    },
    setWiFiDraft: (state, { payload }: PayloadAction<Partial<WiFiDraft>>) => {
      if (payload) {
        state.draft.wifi = { ...state.draft.wifi, ...payload };
      } else {
        state.draft.wifi = initialState.draft.wifi;
      }
    },
  },
});

export const deviceSettingActions = { ...deviceSetting.actions };

export default deviceSetting.reducer;
