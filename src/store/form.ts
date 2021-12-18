import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
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
  emergencyKey: string;
}

const initialState: State = {
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
  emergencyKey: "",
};

const form = createSlice({
  name: "form",
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<Partial<State> | null>) =>
      payload ? { ...state, ...payload } : initialState,
    reset: () => initialState,
  },
});

export const formActions = { ...form.actions };

export default form.reducer;
