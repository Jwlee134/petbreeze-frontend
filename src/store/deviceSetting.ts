import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AreaResponse, GeoJsonType, WiFiResponse } from "~/api/device";

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
        type: GeoJsonType.Point,
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

    setArea: (state, { payload }: PayloadAction<Partial<Area> | null>) => {
      if (payload) {
        state.area = { ...state.area, ...payload };
      } else {
        state.area = initialState.area;
      }
    },

    setAreaResult: (state, { payload }: PayloadAction<AreaResponse[]>) => {
      state.result.Area = payload;
    },

    updateAreaResult: (state, { payload }: PayloadAction<string>) => {
      const { name, address, coord, radius } = state.draft.area;
      const { currentID } = state.area;
      const targetArea =
        state.result.Area[
          state.result.Area.findIndex(area => area.safety_area_id === currentID)
        ];
      targetArea.name = name;
      targetArea.address = address;
      targetArea.coordinate.coordinates = [coord.longitude, coord.latitude];
      targetArea.radius = radius;
      targetArea.thumbnail = payload;
    },

    updateWiFiResult: (state, { payload }: PayloadAction<number>) => {
      const { ssid, password } = state.draft.wifi;
      const { currentID } = state.area;
      const targetArea =
        state.result.Area[
          state.result.Area.findIndex(area => area.safety_area_id === currentID)
        ];
      const targetWiFi =
        targetArea.WiFi[
          targetArea.WiFi.findIndex(wifi => wifi.wifi_id === payload)
        ];
      targetWiFi.ssid = ssid;
      targetWiFi.password = password;
    },

    deleteAreaResult: (state, { payload }: PayloadAction<number>) => {
      const targetIndex = state.result.Area.findIndex(
        area => area.safety_area_id === payload,
      );
      state.result.Area[targetIndex] = initialState.result.Area[targetIndex];
    },

    deleteWiFiResult: (state, { payload }: PayloadAction<number>) => {
      const { currentID } = state.area;
      const targetArea =
        state.result.Area[
          state.result.Area.findIndex(area => area.safety_area_id === currentID)
        ];
      const targetWiFiIndex = targetArea.WiFi.findIndex(
        wifi => wifi.wifi_id === payload,
      );
      targetArea.WiFi[targetWiFiIndex].ssid = null;
      targetArea.WiFi[targetWiFiIndex].password = null;
    },

    setAreaDraft: (
      state,
      { payload }: PayloadAction<Partial<AreaDraft> | null>,
    ) => {
      if (payload) {
        state.draft.area = { ...state.draft.area, ...payload };
      } else {
        state.draft.area = initialState.draft.area;
      }
    },
    setWiFiDraft: (
      state,
      { payload }: PayloadAction<Partial<WiFiDraft> | null>,
    ) => {
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
