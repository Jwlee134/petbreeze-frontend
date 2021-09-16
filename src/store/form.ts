import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "react-native-image-crop-picker";

interface IForm {
  avatar: Image | null;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
  breed: string;
  weight: string;
  characteristic: string;
  hasTag: boolean;
  lostTime: "오전" | "오후";
  lostHour: string;
  lostMinute: string;
  lostPlace: string;
  message: string;
  photos: Image[];
  deviceName: string;
  wifiName: string;
  wifiPw: string;
}

const initialState: IForm = {
  avatar: null,
  name: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  gender: "",
  breed: "",
  weight: "",
  characteristic: "",
  hasTag: true,
  lostTime: "오전",
  lostHour: "",
  lostMinute: "",
  lostPlace: "",
  message: "",
  photos: [],
  deviceName: "",
  wifiName: "",
  wifiPw: "",
};

const form = createSlice({
  name: "form",
  initialState,
  reducers: {
    setDefaultValue: (state, { payload }: PayloadAction<Partial<IForm>>) => {
      state = { ...state, ...payload };
      return state;
    },
    setAvatar: (state, { payload }: PayloadAction<Image>) => {
      state.avatar = payload;
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    setBirthYear: (state, { payload }: PayloadAction<string>) => {
      state.birthYear = payload;
    },
    setBirthMonth: (state, { payload }: PayloadAction<string>) => {
      state.birthMonth = payload;
    },
    setBirthDay: (state, { payload }: PayloadAction<string>) => {
      state.birthDay = payload;
    },
    setGender: (state, { payload }: PayloadAction<string>) => {
      state.gender = payload;
    },
    setBreed: (state, { payload }: PayloadAction<string>) => {
      state.breed = payload;
    },
    setWeight: (state, { payload }: PayloadAction<string>) => {
      state.weight = payload;
    },
    setCharacteristic: (state, { payload }: PayloadAction<string>) => {
      state.characteristic = payload;
    },
    setHasTag: (state, { payload }: PayloadAction<boolean>) => {
      state.hasTag = payload;
    },
    setLostTime: (state, { payload }: PayloadAction<"오전" | "오후">) => {
      state.lostTime = payload;
    },
    setLostHour: (state, { payload }: PayloadAction<string>) => {
      state.lostHour = payload;
    },
    setLostMinute: (state, { payload }: PayloadAction<string>) => {
      state.lostMinute = payload;
    },
    setLostPlace: (state, { payload }: PayloadAction<string>) => {
      state.lostPlace = payload;
    },
    setMessage: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    setPhotos: (state, { payload }: PayloadAction<Image[]>) => {
      state.photos = payload;
    },
    setDeviceName: (state, { payload }: PayloadAction<string>) => {
      state.deviceName = payload;
    },
    setWifiName: (state, { payload }: PayloadAction<string>) => {
      state.wifiName = payload;
    },
    setWifiPw: (state, { payload }: PayloadAction<string>) => {
      state.wifiPw = payload;
    },
    initState: state => {
      state = initialState;
    },
  },
});

export const formActions = { ...form.actions };

export default form.reducer;
