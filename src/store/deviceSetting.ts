import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISafetyZoneResult {
  id: number;
  name: string;
  address: string;
  data: number[];
  image: string;
}

interface ISafetyZoneDraft {
  name: string;
  address: string;
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
  ssid: string;
  pw: string;
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
  photos: string[];
  name: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  sex: boolean;
  species: string;
  weight: string;
  phoneNumber: string;
  hasTag: boolean;
  lostMonth: number;
  lostDate: number;
  lostHour: number;
  lostMinute: number;
  lostPlace: string;
  message: string;
}

interface IState {
  locationInfoCollectionPeriod: number | null;
  safetyZone: ISafetyZone<ISafetyZoneDraft>;
  wifi: IWifi<IWifiDraft>;
  profile: IProfile;
}

const numOfArea = 3;
const numOfWiFi = 5;

const initialState: IState = {
  locationInfoCollectionPeriod: null,
  safetyZone: {
    step2: false,
    animateCamera: false,
    isSearchMode: false,
    isSubmitting: false,
    fromDeviceSetting: false,
    currentId: 0,
    result: Array.from({ length: numOfArea }, (v, i) => ({
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
    result: Array.from({ length: numOfWiFi }, (v, i) => ({
      id: i,
      ssid: "",
      pw: "",
    })),
    draft: {
      ssid: "",
      pw: "",
    },
  },
  profile: {
    photos: [],
    name: "",
    birthYear: 0,
    birthMonth: 0,
    birthDay: 0,
    sex: true,
    species: "",
    weight: "",
    phoneNumber: "",
    hasTag: true,
    lostHour: new Date().getHours(),
    lostMinute: new Date().getMinutes(),
    lostMonth: new Date().getMonth() + 1,
    lostDate: new Date().getDate(),
    lostPlace: "",
    message: "",
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
        ...{
          id: currentId,
          name,
          address,
          image,
          data: [latitude, longitude, radius],
        },
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
      const { currentId } = state.wifi;
      state.wifi.result = state.wifi.result.filter(
        data => data.id !== currentId,
      );
      state.wifi.result.push({ ...{ id: currentId, ...payload } });
    },
    deleteWiFi: (state, { payload }: PayloadAction<number>) => {
      state.wifi.result = state.wifi.result.map(wifi => {
        if (wifi.id === payload) {
          return { ...wifi, ssid: "", pw: "" };
        }
        return wifi;
      });
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
    resetResults: state => {
      state.locationInfoCollectionPeriod =
        initialState.locationInfoCollectionPeriod;
      state.safetyZone.result = initialState.safetyZone.result;
      state.wifi.result = initialState.wifi.result;
    },
  },
});

export const deviceSettingActions = { ...deviceSetting.actions };

export default deviceSetting.reducer;
