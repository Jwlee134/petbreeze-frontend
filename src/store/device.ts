import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDevice {
  id: string;
  profile_image: string;
  name: string;
  location_info_collection_period: number;
  battery: number;
  firmware_version: string;
  breed: string;
  age: number;
  gender: string;
  weight: number;
  phoneNumber: string;
  etc: string;
}

const initialState: IDevice[] = [
  {
    id: "aaaa",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이1",
    battery: 80,
    location_info_collection_period: 1,
    firmware_version: "1.0.0",
    breed: "말티즈",
    age: 10,
    gender: "남",
    weight: 5,
    phoneNumber: "01040318103",
    etc: "하하",
  },
  {
    id: "bbbb",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이2",
    battery: 50,
    location_info_collection_period: 2,
    firmware_version: "1.0.1",
    breed: "말티즈",
    age: 10,
    gender: "남",
    weight: 5,
    phoneNumber: "01040318103",
    etc: "하하",
  },
  {
    id: "cccc",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이3",
    battery: 25,
    location_info_collection_period: 3,
    firmware_version: "1.0.2",
    breed: "말티즈",
    age: 10,
    gender: "남",
    weight: 5,
    phoneNumber: "01040318103",
    etc: "하하",
  },
  {
    id: "dddd",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이4",
    battery: 15,
    location_info_collection_period: 3,
    firmware_version: "1.0.2",
    breed: "말티즈",
    age: 10,
    gender: "남",
    weight: 5,
    phoneNumber: "01040318103",
    etc: "하하",
  },
  {
    id: "dedd",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이4",
    battery: 15,
    location_info_collection_period: 3,
    firmware_version: "1.0.2",
    breed: "말티즈",
    age: 10,
    gender: "남",
    weight: 5,
    phoneNumber: "01040318103",
    etc: "하하",
  },
  {
    id: "ddfd",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이4",
    battery: 15,
    location_info_collection_period: 3,
    firmware_version: "1.0.2",
    breed: "말티즈",
    age: 10,
    gender: "남",
    weight: 5,
    phoneNumber: "01040318103",
    etc: "하하",
  },
  {
    id: "dddg",
    profile_image: require("~/assets/image/test.jpg"),
    name: "막둥이4",
    battery: 15,
    location_info_collection_period: 3,
    firmware_version: "1.0.2",
    breed: "말티즈",
    age: 10,
    gender: "남",
    weight: 5,
    phoneNumber: "01040318103",
    etc: "하하",
  },
];

const device = createSlice({
  name: "device",
  initialState,
  reducers: {},
});

export const deviceActions = { ...device.actions };

export default device.reducer;
