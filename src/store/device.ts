import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDevice {
  id: string;
  profile_image: string;
  name: string;
  location_info_collection_period: number;
  battery: number;
  firmware_version: string;
}

const initialState: IDevice[] = [
  {
    id: "aaaa",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이1",
    battery: 80,
    location_info_collection_period: 1,
    firmware_version: "1.0.0",
  },
  {
    id: "bbbb",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이2",
    battery: 50,
    location_info_collection_period: 2,
    firmware_version: "1.0.1",
  },
  {
    id: "cccc",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이3",
    battery: 25,
    location_info_collection_period: 3,
    firmware_version: "1.0.2",
  },
];

const device = createSlice({
  name: "device",
  initialState,
  reducers: {},
});

export const deviceActions = { ...device.actions };

export default device.reducer;
