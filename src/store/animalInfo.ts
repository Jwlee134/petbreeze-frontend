import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "react-native-image-crop-picker";

interface IState {
  photos: Image[];
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthYear: number;
  lostTime: string;
  lostPlace: string;
  characteristic: string;
  hasTag: boolean | null;
  phoneNumber: { id: number; value: string }[];
  [key: string]: any;
}

const initialState: IState = {
  photos: [],
  name: "",
  species: "",
  breed: "",
  gender: "",
  birthYear: 0,
  lostTime: "",
  lostPlace: "",
  characteristic: "",
  hasTag: null,
  phoneNumber: [{ id: 0, value: "" }],
};

const animalInfo = createSlice({
  name: "animalInfo",
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Image[]>) => {
      state.photos.push(...action.payload);
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
    setLostTime: (state, action: PayloadAction<string>) => {
      state.lostTime = action.payload;
    },
    setLostPlace: (state, action: PayloadAction<string>) => {
      state.lostPlace = action.payload;
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
    initState: state => {
      state = initialState;
      return state;
    },
  },
});

export const animalInfoActions = { ...animalInfo.actions };

export default animalInfo.reducer;
