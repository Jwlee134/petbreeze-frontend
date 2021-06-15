import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  showPath: boolean;
  showMyLocation: boolean;
  myLatitude: number;
  myLongitude: number;
}

const initialState: IState = {
  showPath: false,
  showMyLocation: false,
  myLatitude: 0,
  myLongitude: 0,
};

const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    setShowPath: (state, action: PayloadAction<boolean>) => {
      state.showPath = action.payload;
    },
    setShowMyLocation: (state, action: PayloadAction<boolean>) => {
      state.showMyLocation = action.payload;
    },
    setMyLatitude: (state, action: PayloadAction<number>) => {
      state.myLatitude = action.payload;
    },
    setMyLongitude: (state, action: PayloadAction<number>) => {
      state.myLongitude = action.payload;
    },
    initMyCoords: state => {
      state.myLatitude = 0;
      state.myLongitude = 0;
    },
  },
});

export const mapActions = { ...map.actions };

export default map.reducer;
