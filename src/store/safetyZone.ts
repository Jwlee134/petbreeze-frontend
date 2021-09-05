import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  coord: {
    latitude: number;
    longitude: number;
  };
  name: string;
  radius: string;
  addr: string;
  step2: boolean;
  animateCamera: boolean;
  image: string;
  isSearchMode: boolean;
  isSubmitting: boolean;
}

const initialState: IState = {
  coord: {
    latitude: 0,
    longitude: 0,
  },
  name: "",
  radius: "",
  addr: "",
  step2: false,
  animateCamera: false,
  image: "",
  isSearchMode: false,
  isSubmitting: false,
};

const safetyZone = createSlice({
  name: "safetyZone",
  initialState,
  reducers: {
    setCoord: (
      state,
      { payload }: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.coord = payload;
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    setRadius: (state, { payload }: PayloadAction<string>) => {
      state.radius = payload;
    },
    setAddr: (state, { payload }: PayloadAction<string>) => {
      state.addr = payload;
    },
    setStep2: (state, { payload }: PayloadAction<boolean>) => {
      state.step2 = payload;
    },
    setAnimateCamera: (state, { payload }: PayloadAction<boolean>) => {
      state.animateCamera = payload;
    },
    setIsSearchMode: (state, { payload }: PayloadAction<boolean>) => {
      state.isSearchMode = payload;
    },
    setIsSubmitting: (state, { payload }: PayloadAction<boolean>) => {
      state.isSubmitting = payload;
    },
    init: state => {
      state = initialState;
      return state;
    },
  },
});

export const safetyZoneActions = { ...safetyZone.actions };

export default safetyZone.reducer;
