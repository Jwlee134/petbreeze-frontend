import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/core";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { IDevice } from "~/store/device";

export type RootNavParamList = {
  FirmwareUpdate: undefined;
  Start: undefined;
  LoggedInNav: undefined;
};
export type FirmwareUpdateScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "FirmwareUpdate"
>;
export type StartScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "Start"
>;
export type LoggedInNavScreenProps = StackScreenProps<
  RootNavParamList,
  "LoggedInNav"
>;

export type LoggedInNavParamList = {
  Permissions: undefined;
  BottomTabNav: undefined;
  BleRootStackNav: undefined;
  WalkMap: undefined;
  DeleteAccount: undefined;
  UpdateProfile: {
    data: IDevice;
  };
  EmergencyMissingStackNav: {
    data: IDevice;
  };
  UpdateWiFi: undefined;
};
export type PermissionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "Permissions">,
  StackNavigationProp<RootNavParamList>
>;
export type WalkMapScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "WalkMap">,
  StackNavigationProp<RootNavParamList>
>;
export type UpdateWiFiScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "UpdateWiFi">,
  StackNavigationProp<RootNavParamList>
>;

export type BleRootStackNavParamList = {
  BleWithHeaderStackNav: undefined;
  BleWithoutHeaderStackNav: undefined;
};
export type BleWithHeaderStackNavScreenProps = CompositeScreenProps<
  StackScreenProps<BleRootStackNavParamList, "BleWithHeaderStackNav">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
  >
>;

export type BleWithHeaderStackeNavParamList = {
  DeviceCheck: undefined;
  ChargingCheck: undefined;
  PreWiFiForm: undefined;
  WiFiForm: undefined;
  PreSafetyZone: undefined;
  RegisterProfileFirst: undefined;
  RegisterProfileSecond: undefined;
};
export type DeviceCheckScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackeNavParamList, "DeviceCheck">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type ChargingCheckScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackeNavParamList, "ChargingCheck">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type PreWiFiFormScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackeNavParamList, "PreWiFiForm">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type WiFiFormScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackeNavParamList, "WiFiForm">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type PreSafetyZoneScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackeNavParamList, "PreSafetyZone">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type RegisterProfileFirstScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackeNavParamList, "RegisterProfileFirst">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type RegisterProfileSecondScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackeNavParamList, "RegisterProfileSecond">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;

export type BleWithoutHeaderStackNavParamList = {
  BleLoading: undefined;
  Scanning: undefined;
  ScanningFail: undefined;
  Fail: undefined;
  FirmwareProgress: undefined;
  Success: undefined;
  SafetyZone: undefined;
  Completion: undefined;
};
export type BleLoadingScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "BleLoading">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type ScanningScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "Scanning">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type ScanningFailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "ScanningFail">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type FailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "Fail">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type SuccessScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "Success">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type FirmwareProgressScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "FirmwareProgress">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type SafetyZoneScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "SafetyZone">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type CompletionScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "Completion">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;

export type BottomTabParamList = {
  HomeTab: undefined;
  WalkTab: undefined;
  NotificationTab: undefined;
  MyPageTab: undefined;
};

export type SharedStackNavParamList = {
  Home: undefined;
  WalkTopTabNav: undefined;
  Notification: undefined;
  MyPage: undefined;
  WalkDetail: {
    id: string;
  };
  DeviceSetting: {
    data: IDevice;
  };
  DeviceSettingList: undefined;
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
export type MyPageScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "MyPage">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type WalkDetailScreenProps = CompositeScreenProps<
  StackScreenProps<SharedStackNavParamList, "WalkDetail">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
    >
  >
>;
export type DeviceSettingListScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "DeviceSettingList">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
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

export type WalkTopTabParamList = {
  StartWalking: undefined;
  WalkRecord: undefined;
};
export type StartWalkingScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "StartWalking">,
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
export type WalkRecordScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "WalkRecord">,
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
