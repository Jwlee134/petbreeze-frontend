import { createSlice } from "@reduxjs/toolkit";

interface IState {
  avatarUrl: string;
  name: string;
  age: number;
  breed: string;
  weight: number;
  phoneNumber: number[];
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

const initialState: IState[] = [];

const device = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice: (state, action) => {},
    setSelected: (state, action) => {},
    setPath: (state, action) => {},
    setBattery: (state, action) => {},
  },
});

export const deviceActions = { ...device.actions };

export default device.reducer;
