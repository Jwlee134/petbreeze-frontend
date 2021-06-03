import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "react-native-image-crop-picker";

interface IState {
  photos: Image[];
  avatar: Image | any;
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthYear: number;
  eventTime: string;
  eventPlace: string;
  eventPlaceInfo: string;
  characteristic: string;
  hasTag: boolean | null;
  phoneNumber: { id: number; value: string }[];
  caution: string;
  weight: number;
  [key: string]: any;
}

const initialState: IState = {
  photos: [],
  avatar: require("~/assets/image/default-avatar.jpg"),
  name: "",
  species: "",
  breed: "",
  gender: "",
  birthYear: 0,
  eventTime: "",
  eventPlace: "",
  eventPlaceInfo: "",
  characteristic: "",
  hasTag: null,
  phoneNumber: [{ id: 0, value: "" }],
  caution: "",
  weight: 0,
};

const animalInfo = createSlice({
  name: "animalInfo",
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Image[]>) => {
      state.photos.push(...action.payload);
    },
    setAvatar: (state, action: PayloadAction<Image>) => {
      state.avatar = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string>) => {
      state.species = action.payload;
    },
    setBreed: (state, action: PayloadAction<string>) => {
      state.breed = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setBirthYear: (state, action: PayloadAction<number>) => {
      state.birthYear = action.payload;
    },
    setEventTime: (state, action: PayloadAction<string>) => {
      state.eventTime = action.payload;
    },
    setEventPlace: (state, action: PayloadAction<string>) => {
      state.eventPlace = action.payload;
    },
    setEventPlaceInfo: (state, action: PayloadAction<string>) => {
      state.eventPlaceInfo = action.payload;
    },
    setCharacteristic: (state, action: PayloadAction<string>) => {
      state.characteristic = action.payload;
    },
    setHasTag: (state, action: PayloadAction<boolean>) => {
      state.hasTag = action.payload;
    },
    addPhoneNumberField: state => {
      state.phoneNumber.push({ id: state.phoneNumber.length, value: "" });
    },
    setPhoneNumber: (
      state,
      action: PayloadAction<{ id: number; text: string }>,
    ) => {
      const { id, text } = action.payload;
      const index = state.phoneNumber.findIndex(field => field.id === id);
      state.phoneNumber[index].value = text;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
    },
    setCaution: (state, action: PayloadAction<string>) => {
      state.caution = action.payload;
    },
    initState: state => {
      state = initialState;
      return state;
    },
  },
});

export const animalInfoActions = { ...animalInfo.actions };

export default animalInfo.reducer;
