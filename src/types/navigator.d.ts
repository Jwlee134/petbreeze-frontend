import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera } from "react-native-maps";

/* type SharedStackParamList = {
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
>;*/

type LoggedInNavParamList = {
  AddDevice: {
    isOtaUpdate: boolean;
  };
};
export type AddDeviceScreenRouteProp = RouteProp<
  LoggedInNavParamList,
  "AddDevice"
>;

type BottomTabParamList = {
  Home: undefined;
  Walk: undefined;
  Notification: undefined;
  MyMenu: undefined;
};

type SharedStackParamList = {
  Home: undefined;
  Notification: undefined;
};
export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackParamList, "Home">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    StackNavigationProp<LoggedInNavParamList>
  >
>;
export type NotificationScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackParamList, "Notification">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    StackNavigationProp<LoggedInNavParamList>
  >
>;

type WalkStackNavParamList = {
  Walk: undefined;
  WalkMap: {
    deviceId: string[];
  };
};
export type WalkScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<WalkStackNavParamList, "Walk">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    StackNavigationProp<LoggedInNavParamList>
  >
>;
export type WalkMapScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<WalkStackNavParamList, "WalkMap">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    StackNavigationProp<LoggedInNavParamList>
  >
>;
export type WalkMapScreenRouteProp = RouteProp<
  WalkStackNavParamList,
  "WalkMap"
>;

type WalkTopTabParamList = {
  StartWalking: undefined;
  WalkRecord: undefined;
};
export type StartWalkingScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "StartWalking">,
  CompositeNavigationProp<
    StackNavigationProp<WalkStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      StackNavigationProp<LoggedInNavParamList>
    >
  >
>;
export type WalkRecordScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "WalkRecord">,
  CompositeNavigationProp<
    StackNavigationProp<WalkStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      StackNavigationProp<LoggedInNavParamList>
    >
  >
>;
