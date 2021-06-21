import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  showPath: boolean;
  showMyLocation: boolean;
  myCoords: {
    latitude: number;
    longitude: number;
  };
}

const initialState: IState = {
  showPath: false,
  showMyLocation: false,
  myCoords: {
    latitude: 0,
    longitude: 0,
  },
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
    setMyCoords: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
      }>,
    ) => {
      const { latitude, longitude } = action.payload;
      state.myCoords.latitude = latitude;
      state.myCoords.longitude = longitude;
    },
    initMyCoords: state => {
      state.myCoords.latitude = 0;
      state.myCoords.longitude = 0;
    },
  },
});

export const mapActions = { ...map.actions };

export default map.reducer;
