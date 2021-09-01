import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IDevice } from "~/store/device";

type LoggedInNavParamList = {
  BottomTabNav: {
    initialTab?: string;
  };
  AddDevice: {
    isOtaUpdate: boolean;
  };
  WalkMap: undefined;
  DeleteAccount: undefined;
  UpdateProfile: {
    data: IDevice;
  };
  EmergencyMissing: {
    data: IDevice;
  };
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
export type DeleteAccountScreenNavigationProp = StackNavigationProp<
  LoggedInNavParamList,
  "DeleteAccount"
>;
export type UpdateProfileScreenNavigationProp = StackNavigationProp<
  LoggedInNavParamList,
  "UpdateProfile"
>;
export type UpdateProfileRouteProp = RouteProp<
  LoggedInNavParamList,
  "UpdateProfile"
>;
export type EmergencyMissingScreenNavigationProp = StackNavigationProp<
  LoggedInNavParamList,
  "EmergencyMissing"
>;
export type EmergencyMissingRouteProp = RouteProp<
  LoggedInNavParamList,
  "EmergencyMissing"
>;

type BottomTabParamList = {
  HomeTab: undefined;
  WalkTab: undefined;
  NotificationTab: undefined;
  MyPageTab: undefined;
};

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
  WalkTopTabNav: {
    initialTab?: string;
  };
  Notification: undefined;
  MyPageStackNav: undefined;
  WalkDetail: {
    id: string;
  };
  DeviceSetting: {
    data: IDevice;
  };
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
export type WalkDetailRouteProp = RouteProp<
  SharedStackNavParamList,
  "WalkDetail"
>;
export type DeviceSettingScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "DeviceSetting">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    StackNavigationProp<LoggedInNavParamList>
  >
>;
export type DeviceSettingRouteProp = RouteProp<
  SharedStackNavParamList,
  "DeviceSetting"
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

type MyPageStackNavParamList = {
  MyPage: undefined;
  DeviceSettingList: {
    data: IDevice[];
  };
};
export type MyPageScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageStackNavParamList, "MyPage">,
  CompositeNavigationProp<
    StackNavigationProp<SharedStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      StackNavigationProp<LoggedInNavParamList>
    >
  >
>;
export type DeviceSettingListScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageStackNavParamList, "DeviceSettingList">,
  CompositeNavigationProp<
    StackNavigationProp<SharedStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      StackNavigationProp<LoggedInNavParamList>
    >
  >
>;
export type DeviceSettingListRouteProp = RouteProp<
  MyPageStackNavParamList,
  "DeviceSettingList"
>;
