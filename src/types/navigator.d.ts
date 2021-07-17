import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera } from "react-native-maps";

type SharedStackParamList = {
  Home: undefined;
  Walk: undefined;
  Community: undefined;
  Notification: undefined;
  AddDevice:
    | {
        execute: boolean;
      }
    | undefined;
  MyPage: undefined;
  PetProfile: undefined;
  PassManagement: undefined;
  ServiceCenter: undefined;
  NotificationSetting: undefined;
  DeleteAccount: undefined;
  DeviceSetting: undefined;
  DeviceList: undefined;
  LocationCollectInterval: undefined;
  SafetyZoneSetting: undefined;
  SafetyZoneMap:
    | {
        id: number;
        name: string;
        camera: Camera;
        range: {
          label: string;
          value: number;
        };
      }
    | undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Home"
>;
export type CommunityScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Community"
>;
export type NotificationScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Notification"
>;
export type MyPageScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "MyPage"
>;
export type DeviceSettingScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "DeviceSetting"
>;
export type DeviceListScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "DeviceList"
>;
export type SafetyZoneScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "SafetyZoneSetting"
>;
export type SafetyZoneMapScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "SafetyZoneMap"
>;
export type SafetyZoneMapScreenRouteProp = RouteProp<
  SharedStackParamList,
  "SafetyZoneMap"
>;
export type AddDeviceScreenRouteProp = RouteProp<
  SharedStackParamList,
  "AddDevice"
>;

type WalkStackParamList = {
  Walk: undefined;
  WalkMap: undefined;
  StartWalking: undefined;
  WalkRecord: undefined;
  AddDevice: undefined;
};

export type WalkScreenNavigationProp = StackNavigationProp<
  WalkStackParamList,
  "Walk"
>;
export type WalkMapScreenNavigationProp = StackNavigationProp<
  WalkStackParamList,
  "WalkMap"
>;
export type StartWalkingScreenNavigationProp = StackNavigationProp<
  WalkStackParamList,
  "StartWalking"
>;
export type WalkRecordScreenNavigationProp = StackNavigationProp<
  WalkStackParamList,
  "WalkRecord"
>;
