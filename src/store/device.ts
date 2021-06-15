import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  id: number;
  avatarUrl: string;
  name: string;
  age: number;
  breed: string;
  weight: number;
  phoneNumber: { id: number; value: string }[];
  battery: number;
  remaningTime: number;
  selected: boolean;
  path: {
    latitude: number;
    longitude: number;
    date: number;
    utc: number;
  }[];
}

const initialState: IState[] = [
  {
    id: 1,
    avatarUrl: require("~/assets/image/test.jpg"),
    name: "막둥이",
    age: 10,
    breed: "말티즈",
    weight: 5,
    phoneNumber: [{ id: 1, value: "01040318103" }],
    battery: 80,
    remaningTime: 5,
    selected: false,
    path: [
      { latitude: 37.477883, longitude: 126.950419, date: 210614, utc: 215523 },
      { latitude: 37.478832, longitude: 126.950562, date: 210614, utc: 215523 },
      { latitude: 37.478892, longitude: 126.949897, date: 210614, utc: 215523 },
      { latitude: 37.477998, longitude: 126.949758, date: 210614, utc: 215523 },
    ],
  },
  {
    id: 2,
    avatarUrl: require("~/assets/image/test.jpg"),
    name: "막둥이",
    age: 10,
    breed: "말티즈",
    weight: 5,
    phoneNumber: [{ id: 1, value: "01040318103" }],
    battery: 80,
    remaningTime: 5,
    selected: false,
    path: [
      { latitude: 37.480237, longitude: 126.951657, date: 210614, utc: 215523 },
      { latitude: 37.480365, longitude: 126.95038, date: 210614, utc: 215523 },
      { latitude: 37.48148, longitude: 126.950541, date: 210614, utc: 215523 },
      { latitude: 37.481386, longitude: 126.951807, date: 210614, utc: 215523 },
    ],
  },
  {
    id: 3,
    avatarUrl: require("~/assets/image/test.jpg"),
    name: "막둥이",
    age: 10,
    breed: "말티즈",
    weight: 5,
    phoneNumber: [{ id: 1, value: "01040318103" }],
    battery: 80,
    remaningTime: 5,
    selected: false,
    path: [
      { latitude: 37.479079, longitude: 126.953631, date: 210614, utc: 215523 },
      { latitude: 37.480126, longitude: 126.95391, date: 210614, utc: 215523 },
      { latitude: 37.479615, longitude: 126.955369, date: 210614, utc: 215523 },
      { latitude: 37.478585, longitude: 126.955541, date: 210614, utc: 215523 },
    ],
  },
];

const device = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice: (state, action) => {},
    setSelected: (state, action: PayloadAction<number>) => {
      return state.map(device => {
        if (device.id === action.payload) {
          return { ...device, selected: true };
        }
        return { ...device, selected: false };
      });
    },
    setPath: (
      state,
      action: PayloadAction<{
        id: number;
        latitude: number;
        longitude: number;
        date: number;
        utc: number;
      }>,
    ) => {
      const { id, latitude, longitude, date, utc } = action.payload;
      state[state.findIndex(device => device.id === id)].path.push({
        latitude,
        longitude,
        date,
        utc,
      });
    },
    setBattery: (state, action) => {},
  },
});

export const deviceActions = { ...device.actions };

export default device.reducer;
