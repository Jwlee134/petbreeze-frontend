import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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
  BottomTabNav: {
    initialTab?: string;
  };
  AddDevice: {
    isOtaUpdate: boolean;
  };
  WalkMap: undefined;
};
export type BottomTabNavRouteProp = RouteProp<
  LoggedInNavParamList,
  "BottomTabNav"
>;
export type AddDeviceScreenRouteProp = RouteProp<
  LoggedInNavParamList,
  "AddDevice"
>;
export type WalkMapScreenNavigationProp = StackNavigationProp<
  LoggedInNavParamList,
  "WalkMap"
>;

type BottomTabParamList = {
  HomeTab: undefined;
  WalkStackNav: {
    initialTab?: string;
  };
  NotificationTab: undefined;
  MyMenuTab: undefined;
};
export type WalkStackNavRouteProp = RouteProp<
  BottomTabParamList,
  "WalkStackNav"
>;

type WalkStackNavParamList = {
  WalkTopTab: {
    initialTab?: string;
  };
  WalkDetail: undefined;
};
export type WalkTopTabRouteProp = RouteProp<
  WalkStackNavParamList,
  "WalkTopTab"
>;

type SharedStackNavParamList = {
  Home: undefined;
  Notification: undefined;
};
export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "Home">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    StackNavigationProp<LoggedInNavParamList>
  >
>;
export type NotificationScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "Notification">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    StackNavigationProp<LoggedInNavParamList>
  >
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
