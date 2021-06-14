import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  home: {
    myLatitude: number;
    myLongitude: number;
    coordinates: {
      latitude: number;
      longitude: number;
    }[];
  };
}

const initialState: IState = {
  home: {
    myLatitude: 0,
    myLongitude: 0,
    coordinates: [
      /*  {
        latitude: 37.337558,
        longitude: -122.032382,
      },
      {
        latitude: 37.333264,
        longitude: -122.032298,
      },
      {
        latitude: 37.333304,
        longitude: -122.023645,
      }, */
      {
        latitude: 37.553845,
        longitude: 126.970555,
      },
      {
        latitude: 37.568056,
        longitude: 126.976859,
      },
      {
        latitude: 37.578056,
        longitude: 126.986859,
      },
    ],
  },
};

const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMyLatitude: (state, action: PayloadAction<number>) => {
      state.home.myLatitude = action.payload;
    },
    setMyLongitude: (state, action: PayloadAction<number>) => {
      state.home.myLongitude = action.payload;
    },
    initMyCoords: state => {
      state.home.myLatitude = 0;
      state.home.myLongitude = 0;
    },
    setCoordinates: state => {
      state.home.coordinates.push({
        latitude: 37.578056,
        longitude: 126.990859,
      });
    },
  },
});

export const mapActions = { ...map.actions };

export default map.reducer;
