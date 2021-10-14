import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  RouteProp,
} from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { IDevice } from "~/store/device";

export type RootNavParamList = {
  FirmwareUpdate: undefined;
  Start: undefined;
  Intro: undefined;
  Auth: undefined;
  LoggedInNav: undefined;
  Loading: {
    token: string;
    userID?: string;
    nickname: string;
  };
};
export type FirmwareUpdateScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "FirmwareUpdate"
>;
export type StartScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "Start"
>;
export type IntroScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "Intro"
>;
export type AuthScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  "Auth"
>;
export type LoggedInNavScreenProps = StackScreenProps<
  RootNavParamList,
  "LoggedInNav"
>;
export type LoadingScreenProps = StackScreenProps<RootNavParamList, "Loading">;

export type LoggedInNavParamList = {
  Permissions: undefined;
  BottomTabNav: undefined;
  BleRootStackNav: undefined;
  WalkMap: undefined;
  UpdateProfile: {
    data: IDevice;
  };
  EmergencyMissingStackNav: {
    data: IDevice;
  };
  DeleteAccountStackNav: undefined;
  UpdateWiFi: undefined;
  DeviceAlert: undefined;
};
export type PermissionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "Permissions">,
  StackNavigationProp<RootNavParamList>
>;
export type WalkMapScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "WalkMap">,
  StackNavigationProp<RootNavParamList>
>;
export type EmergencyMissingStackNavScreenProps = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "EmergencyMissingStackNav">,
  StackScreenProps<RootNavParamList>
>;
export type UpdateWiFiScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "UpdateWiFi">,
  StackNavigationProp<RootNavParamList>
>;

export type EmergencyMissingStackNavParamList = {
  EmergencyMissingFirstPage: {
    device: IDevice;
  };
  EmergencyMissingSecondPage: undefined;
};
export type EmergencyMissingFirstPageScreenNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<
      EmergencyMissingStackNavParamList,
      "EmergencyMissingFirstPage"
    >,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >;
export type EmergencyMissingSecondPageScreenNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<
      EmergencyMissingStackNavParamList,
      "EmergencyMissingSecondPage"
    >,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >;

export type DeleteAccountStackNavParamList = {
  DeleteAccountFirstPage: undefined;
  DeleteAccountSecondPage: undefined;
};
export type DeleteAccountFirstPageScreenNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<
      DeleteAccountStackNavParamList,
      "DeleteAccountFirstPage"
    >,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >;
export type DeleteAccountSecondPageScreenNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<
      DeleteAccountStackNavParamList,
      "DeleteAccountSecondPage"
    >,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >;

export type BleRootStackNavParamList = {
  BleWithHeaderStackNav: undefined;
  BleWithoutHeaderStackNav: undefined;
};
export type BleWithHeaderStackNavScreenRouteProp = RouteProp<
  BleRootStackNavParamList,
  "BleWithHeaderStackNav"
>;
export type BleWithHeaderStackNavScreenNavigationProp =
  StackNavigationProp<BleWithHeaderStackNavParamList>;

export type BleWithHeaderStackNavParamList = {
  DeviceCheck: undefined;
  ChargingCheck: undefined;
  PreWiFiForm: undefined;
  WiFiForm: undefined;
  PreSafetyZone: undefined;
  RegisterProfileFirst: undefined;
  RegisterProfileSecond: undefined;
};
export type DeviceCheckScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "DeviceCheck">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type ChargingCheckScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "ChargingCheck">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type PreWiFiFormScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "PreWiFiForm">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type WiFiFormScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "WiFiForm">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type PreSafetyZoneScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "PreSafetyZone">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type RegisterProfileFirstScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "RegisterProfileFirst">,
  CompositeNavigationProp<
    StackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type RegisterProfileSecondScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "RegisterProfileSecond">,
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
  NotificationSetting: undefined;
  WalkDetailMonth: {
    id: string;
  };
  WalkDetailDay: {
    id: string;
    date: string;
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
export type WalkDetailMonthScreenProps = CompositeScreenProps<
  StackScreenProps<SharedStackNavParamList, "WalkDetailMonth">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
    >
  >
>;
export type WalkDetailDayScreenProps = CompositeScreenProps<
  StackScreenProps<SharedStackNavParamList, "WalkDetailDay">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
    >
  >
>;
export type WalkDetailDayScreenRouteProp = RouteProp<
  SharedStackNavParamList,
  "WalkDetailDay"
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
