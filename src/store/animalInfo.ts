import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
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
  witnessedLog: {
    id: number;
    date: string;
    place: string;
    description: string;
  }[];
  [key: string]: any;
}

const initialState: IState = {
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
  witnessedLog: [{ id: 0, date: "", place: "", description: "" }],
};

const animalInfo = createSlice({
  name: "animalInfo",
  initialState,
  reducers: {
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
    addWitnessedLogField: state => {
      state.witnessedLog.push({
        id: state.witnessedLog.length,
        date: "",
        place: "",
        description: "",
      });
    },
    setWitNessedLogDescription: (
      state,
      action: PayloadAction<{ id: number; text: string }>,
    ) => {
      const { id, text } = action.payload;
      const index = state.witnessedLog.findIndex(item => item.id === id);
      state.witnessedLog[index].description = text;
    },
  },
});

export const animalInfoActions = { ...animalInfo.actions };

export default animalInfo.reducer;
