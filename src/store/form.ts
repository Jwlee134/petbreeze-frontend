import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { Image } from "react-native-image-crop-picker";

interface IForm {
  avatar: Image | ImageSourcePropType;
  name: string;
  breed: string;
  age: string;
  phoneNumber: { id: number; value: string }[];
  caution: string;
  weight: string;
  [key: string]: any;
}

const initialState: IForm = {
  avatar: require("~/assets/image/petbreeze-logo.jpg"),
  name: "",
  breed: "",
  age: "",
  phoneNumber: [
    { id: 0, value: "" },
    { id: 1, value: "" },
  ],
  caution: "",
  weight: "",
};

const form = createSlice({
  name: "form",
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<Image>) => {
      state.avatar = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setBreed: (state, action: PayloadAction<string>) => {
      state.breed = action.payload;
    },
    setAge: (state, action: PayloadAction<string>) => {
      state.age = action.payload;
    },
    setPhoneNumber: (
      state,
      action: PayloadAction<{ id: number; text: string }>,
    ) => {
      const { id, text } = action.payload;
      const index = state.phoneNumber.findIndex(field => field.id === id);
      state.phoneNumber[index].value = text;
    },
    setWeight: (state, action: PayloadAction<string>) => {
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

export const formActions = { ...form.actions };

export default form.reducer;
