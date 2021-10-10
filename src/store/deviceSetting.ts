import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISafetyZoneResult {
  id: number;
  name: string;
  addr: string;
  image: string;
  data: number[];
}

interface ISafetyZoneDraft {
  name: string;
  addr: string;
  image: string;
  coord: {
    latitude: number;
    longitude: number;
  };
  radius: number;
}

interface ISafetyZone<T> {
  step2: boolean;
  animateCamera: boolean;
  isSearchMode: boolean;
  isSubmitting: boolean;
  fromDeviceSetting: boolean;
  currentId: number;
  result: ISafetyZoneResult[];
  draft: T;
}

interface IWifiDraft {
  name: string;
  password: string;
}

interface IWifiResult extends IWifiDraft {
  id: number;
}

interface IWifi<T> {
  currentId: number;
  result: IWifiResult[];
  draft: T;
}

interface IProfile {
  avatar: string;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
  breed: string;
  weight: string;
  characteristic: string;
}

interface IState {
  locationInfoCollectionPeriod: number;
  safetyZone: ISafetyZone<ISafetyZoneDraft>;
  wifi: IWifi<IWifiDraft>;
  profile: IProfile;
}

const initialState: IState = {
  locationInfoCollectionPeriod: 0,
  safetyZone: {
    step2: false,
    animateCamera: false,
    isSearchMode: false,
    isSubmitting: false,
    fromDeviceSetting: false,
    currentId: 0,
    result: [],
    draft: {
      name: "",
      addr: "",
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
    result: [],
    draft: {
      name: "",
      password: "",
    },
  },
  profile: {
    avatar: "",
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "",
    breed: "",
    weight: "",
    characteristic: "",
  },
};

const deviceSetting = createSlice({
  name: "deviceSetting",
  initialState,
  reducers: {
    setLocationInfoCollectionPeriod: (
      state,
      { payload }: PayloadAction<number>,
    ) => {
      state.locationInfoCollectionPeriod = payload;
    },

    setSafetyZone: (
      state,
      {
        payload,
      }: PayloadAction<Partial<ISafetyZone<Partial<ISafetyZoneDraft>>> | null>,
    ) => {
      if (payload) {
        state.safetyZone = {
          ...state.safetyZone,
          ...payload,
          draft: { ...state.safetyZone.draft, ...payload.draft },
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
      { payload }: PayloadAction<ISafetyZoneDraft>,
    ) => {
      const currentId = state.safetyZone.currentId;
      const exist = state.safetyZone.result.some(data => data.id === currentId);
      if (exist) {
        state.safetyZone.result = state.safetyZone.result.map(area => {
          if (area.id === currentId) {
            return {
              ...area,
              ...payload,
              data: [
                payload.coord.latitude,
                payload.coord.longitude,
                payload.radius,
              ],
            };
          } else {
            return area;
          }
        });
      } else {
        state.safetyZone.result.push({
          id: state.safetyZone.result.length + 1,
          ...payload,
          data: [
            payload.coord.latitude,
            payload.coord.longitude,
            payload.radius,
          ],
        });
      }
    },

    setWifi: (
      state,
      { payload }: PayloadAction<Partial<IWifi<Partial<IWifiDraft>>> | null>,
    ) => {
      if (payload) {
        state.wifi = {
          ...state.wifi,
          ...payload,
          draft: { ...state.wifi.draft, ...payload.draft },
        };
      } else {
        state.wifi = { ...initialState.wifi, result: state.wifi.result };
      }
    },
    updateWifiResult: (state, { payload }: PayloadAction<IWifiDraft>) => {
      const currentId = state.wifi.currentId;
      const exist = state.wifi.result.some(data => data.id === currentId);

      if (exist) {
        state.wifi.result = state.wifi.result.map(data => {
          if (data.id === currentId) {
            return { ...data, ...payload };
          } else {
            return data;
          }
        });
      } else {
        state.wifi.result.push({
          id: state.wifi.result.length + 1,
          ...payload,
        });
      }
    },

    setProfile: (
      state,
      { payload }: PayloadAction<Partial<IProfile> | null>,
    ) => {
      if (payload) {
        state.profile = { ...state.profile, ...payload };
      } else {
        state.profile = initialState.profile;
      }
    },

    reset: () => initialState,
  },
});

export const deviceSettingActions = { ...deviceSetting.actions };

export default deviceSetting.reducer;
