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
  phoneNumber: string;
  etc: string;
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
  phoneNumber: "",
  etc: "",
};

const form = createSlice({
  name: "form",
  initialState,
  reducers: {
    setDefaultValue: (state, { payload }: PayloadAction<IForm>) => {
      state = payload;
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
    setPhoneNumber: (state, { payload }: PayloadAction<string>) => {
      state.phoneNumber = payload;
    },
    setEtc: (state, { payload }: PayloadAction<string>) => {
      state.etc = payload;
    },
    initState: state => {
      state = initialState;
    },
  },
});

export const formActions = { ...form.actions };

export default form.reducer;
