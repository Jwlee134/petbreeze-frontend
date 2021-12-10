import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AreaResponse, GeoJsonType, WiFiResponse } from "~/api/device";

interface AreaDraft {
  name: string;
  address: string;
  thumbnail: string;
  coord: { latitude: number; longitude: number };
  radius: number;
}

type WiFiDraft = Omit<WiFiResponse, "wifi_number">;

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
    collection_period: number;
    safety_areas: AreaResponse[];
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
    collection_period: 0,
    safety_areas: Array.from({ length: 3 }, (v, i) => ({
      safety_area_number: i,
      name: "",
      address: "",
      thumbnail: "",
      coordinate: {
        type: GeoJsonType.Point,
        coordinates: [0, 0],
      },
      radius: 0,
      wifis: Array.from({ length: 3 }, (v, i) => ({
        wifi_number: i,
        ssid: "",
        password: "",
      })),
    })),
  },
  draft: {
    area: {
      name: "",
      address: "",
      thumbnail: "",
      coord: { latitude: 0, longitude: 0 },
      radius: 50,
    },
    wifi: { ssid: "", password: "" },
  },
};

const deviceSetting = createSlice({
  name: "deviceSetting",
  initialState,
  reducers: {
    setPeriod: (state, { payload }: PayloadAction<number>) => {
      state.result.collection_period = payload;
    },

    setArea: (state, { payload }: PayloadAction<Partial<Area> | null>) => {
      if (payload) {
        state.area = { ...state.area, ...payload };
      } else {
        state.area = initialState.area;
      }
    },

    setAreaResult: (state, { payload }: PayloadAction<AreaResponse[]>) => {
      state.result.safety_areas = payload;
    },

    updateAreaResult: (
      state,
      { payload }: PayloadAction<{ address: string; thumbnail: string }>,
    ) => {
      const { name, coord, radius } = state.draft.area;
      const { address, thumbnail } = payload;
      const { currentID } = state.area;
      const targetArea =
        state.result.safety_areas[
          state.result.safety_areas.findIndex(
            area => area.safety_area_number === currentID,
          )
        ];
      targetArea.name = name;
      targetArea.address = address;
      targetArea.coordinate.coordinates = [coord.longitude, coord.latitude];
      targetArea.radius = radius;
      targetArea.thumbnail = thumbnail;
    },

    updateWiFiResult: (state, { payload }: PayloadAction<number>) => {
      const { ssid, password } = state.draft.wifi;
      const { currentID } = state.area;
      const targetArea =
        state.result.safety_areas[
          state.result.safety_areas.findIndex(
            area => area.safety_area_number === currentID,
          )
        ];
      const targetWiFi =
        targetArea.wifis[
          targetArea.wifis.findIndex(wifi => wifi.wifi_number === payload)
        ];
      targetWiFi.ssid = ssid;
      targetWiFi.password = password;
    },

    deleteAreaResult: (state, { payload }: PayloadAction<number>) => {
      const targetIndex = state.result.safety_areas.findIndex(
        area => area.safety_area_number === payload,
      );
      state.result.safety_areas[targetIndex] =
        initialState.result.safety_areas[targetIndex];
    },

    deleteWiFiResult: (state, { payload }: PayloadAction<number>) => {
      const { currentID } = state.area;
      const targetArea =
        state.result.safety_areas[
          state.result.safety_areas.findIndex(
            area => area.safety_area_number === currentID,
          )
        ];
      const targetWiFiIndex = targetArea.wifis.findIndex(
        wifi => wifi.wifi_number === payload,
      );
      targetArea.wifis[targetWiFiIndex].ssid = "";
      targetArea.wifis[targetWiFiIndex].password = "";
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

    reset: () => initialState,
  },
});

export const deviceSettingActions = { ...deviceSetting.actions };

export default deviceSetting.reducer;
