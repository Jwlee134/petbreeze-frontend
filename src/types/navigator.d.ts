import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IDevice } from "~/store/device";

type RootNavParamList = {
  FirmwareUpdate: undefined;
  Start: undefined;
  LoggedInNav:
    | {
        initialRouteName?: "Permissions" | "WalkMap" | "BleStackNav";
        initialRouteName2?: "PreSafetyZone" | "RegisterProfileFirst";
      }
    | undefined;
};
export type FirmwareUpdateScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "FirmwareUpdate"
>;
export type StartScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "Start"
>;
export type LoggedInNavNavigationProp = StackNavigationProp<
  RootNavParamList,
  "LoggedInNav"
>;
export type LoggedInNavRouteProp = RouteProp<RootNavParamList, "LoggedInNav">;

type LoggedInNavParamList = {
  Permissions: undefined;
  BottomTabNav: {
    initialTab?: string;
  };
  BleStackNav:
    | {
        isOtaUpdate?: boolean;
        initialRouteName?: "PreSafetyZone" | "RegisterProfileFirst";
      }
    | undefined;
  WalkMap: undefined;
  DeleteAccount: undefined;
  UpdateProfile: {
    data: IDevice;
  };
  EmergencyMissing: {
    data: IDevice;
  };
};
export type PermissionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "Permissions">,
  StackNavigationProp<RootNavParamList>
>;
export type BottomTabNavNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "BottomTabNav">,
  StackNavigationProp<RootNavParamList>
>;
export type BottomTabNavRouteProp = RouteProp<
  LoggedInNavParamList,
  "BottomTabNav"
>;
export type BleStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "BleStackNav">,
  StackNavigationProp<RootNavParamList>
>;
export type BleStackNavRouteProp = RouteProp<
  LoggedInNavParamList,
  "BleStackNav"
>;
export type WalkMapScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "WalkMap">,
  StackNavigationProp<RootNavParamList>
>;
export type DeleteAccountScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "DeleteAccount">,
  StackNavigationProp<RootNavParamList>
>;
export type UpdateProfileScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "UpdateProfile">,
  StackNavigationProp<RootNavParamList>
>;
export type UpdateProfileRouteProp = RouteProp<
  LoggedInNavParamList,
  "UpdateProfile"
>;
export type EmergencyMissingScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "EmergencyMissing">,
  StackNavigationProp<RootNavParamList>
>;
export type EmergencyMissingRouteProp = RouteProp<
  LoggedInNavParamList,
  "EmergencyMissing"
>;

type BleNavParamList = {
  PreStart: undefined;
  BluetoothCheck: undefined;
  BleProgress: undefined;
  PreSafetyZone: undefined;
  SafetyZone: undefined;
  RegisterProfileFirst: undefined;
  RegisterProfileSecond: undefined;
  RegisterProfileThird: undefined;
};
export type PreStartScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "PreStart">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
>;
export type BluetoothCheckScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "BluetoothCheck">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
>;
export type BleProgressScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "BleProgress">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
>;
export type PreSafetyZoneScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "PreSafetyZone">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
>;
export type SafetyZoneScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "SafetyZone">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
>;
export type RegisterProfileFirstScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "RegisterProfileFirst">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
>;
export type RegisterProfileSecondScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "RegisterProfileSecond">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
>;
export type RegisterProfileThirdScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleNavParamList, "RegisterProfileThird">,
  CompositeNavigationProp<
    StackNavigationProp<LoggedInNavParamList>,
    StackNavigationProp<RootNavParamList>
  >
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
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type NotificationScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "Notification">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
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
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
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
      CompositeNavigationProp<
        StackNavigationProp<LoggedInNavParamList>,
        StackNavigationProp<RootNavParamList>
      >
    >
  >
>;
export type WalkRecordScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "WalkRecord">,
  CompositeNavigationProp<
    StackNavigationProp<WalkStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      CompositeNavigationProp<
        StackNavigationProp<LoggedInNavParamList>,
        StackNavigationProp<RootNavParamList>
      >
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
      CompositeNavigationProp<
        StackNavigationProp<LoggedInNavParamList>,
        StackNavigationProp<RootNavParamList>
      >
    >
  >
>;
export type DeviceSettingListScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageStackNavParamList, "DeviceSettingList">,
  CompositeNavigationProp<
    StackNavigationProp<SharedStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      CompositeNavigationProp<
        StackNavigationProp<LoggedInNavParamList>,
        StackNavigationProp<RootNavParamList>
      >
    >
  >
>;
export type DeviceSettingListRouteProp = RouteProp<
  MyPageStackNavParamList,
  "DeviceSettingList"
>;
