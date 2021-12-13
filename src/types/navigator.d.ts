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
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

interface StartWalkingParams {
  preSelectedID?: number;
}

interface WalkDetailDayParams {
  deviceID: number;
  date: string;
  avatarUrl: string;
}

interface BatteryAlertParams {
  battery: string;
  avatarUrl: string;
}

export type RootNavParamList = {
  FirmwareUpdate: undefined;
  Start: undefined;
  Intro: undefined;
  Auth: undefined;
  LoggedInNav:
    | {
        initialRouteName?: keyof LoggedInNavParamList;
        initialBottomTabRouteName?: keyof BottomTabParamList;
        initialBleWithHeaderStackNavRouteName?: keyof BleWithHeaderStackNavParamList;
        initialWalkDetailDayParams?: WalkDetailDayParams;
        initialBatteryAlertParams?: BatteryAlertParams;
      }
    | undefined;
};
export type FirmwareUpdateScreenNavigationProp = NativeStackNavigationProp<
  RootNavParamList,
  "FirmwareUpdate"
>;
export type StartScreenNavigationProp = NativeStackNavigationProp<
  RootNavParamList,
  "Start"
>;
export type IntroScreenNavigationProp = NativeStackNavigationProp<
  RootNavParamList,
  "Intro"
>;
export type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootNavParamList,
  "Auth"
>;
export type LoggedInNavScreenNavigationProp =
  NativeStackNavigationProp<LoggedInNavParamList>;
export type LoggedInNavRouteProp = RouteProp<RootNavParamList, "LoggedInNav">;

export type LoggedInNavParamList = {
  Policy: undefined;
  Permission: undefined;
  AddDevice: { isOnboarding?: boolean } | undefined;
  InvitationCodeForm: undefined;
  BottomTabNav:
    | {
        initialRouteName?: keyof BottomTabParamList;
      }
    | undefined;
  BleRootStackNav:
    | {
        initialRouteName?: keyof BleRootStackNavParamList;
        initialBleWithHeaderStackNavRouteName?: keyof BleWithHeaderStackNavParamList;
        initialBleWithoutHeaderStackNavRouteName?: keyof BleWithoutHeaderStackNavParamList;
      }
    | undefined;
  WalkMap: undefined;
  UpdateArea: undefined;
  UpdateProfile: {
    deviceID: number;
  };
  EmergencyMissingStackNav: {
    deviceID: number;
    name: string;
    avatar: string;
    isModify?: boolean;
  };
  DeleteAccountStackNav: undefined;
  UpdateWiFi: { id: number };
  BatteryAlert: BatteryAlertParams;
  Success: { text: string; key?: string };
  WalkDetailDay: WalkDetailDayParams;
  Welcome: undefined;
};
export type BottomTabNavRouteProp = RouteProp<
  LoggedInNavParamList,
  "BottomTabNav"
>;
export type BleRootStackNavRouteProp = RouteProp<
  LoggedInNavParamList,
  "BleRootStackNav"
>;
export type PolicyScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<LoggedInNavParamList, "Policy">,
  NativeStackNavigationProp<RootNavParamList>
>;
export type PermissionScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<LoggedInNavParamList, "Permission">,
  NativeStackNavigationProp<RootNavParamList>
>;
export type AddDeviceScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LoggedInNavParamList, "AddDevice">,
  NativeStackScreenProps<RootNavParamList>
>;
export type InvitationCodeFormScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<LoggedInNavParamList, "InvitationCodeForm">,
  NativeStackNavigationProp<RootNavParamList>
>;
export type WalkMapScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<LoggedInNavParamList, "WalkMap">,
  NativeStackNavigationProp<RootNavParamList>
>;
export type UpdateAreaScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<LoggedInNavParamList, "UpdateArea">,
  NativeStackNavigationProp<RootNavParamList>
>;
export type WelcomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<LoggedInNavParamList, "Welcome">,
  NativeStackNavigationProp<RootNavParamList>
>;
export type UpdateProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LoggedInNavParamList, "UpdateProfile">,
  NativeStackScreenProps<RootNavParamList>
>;
export type UpdateWiFiScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LoggedInNavParamList, "UpdateWiFi">,
  NativeStackScreenProps<RootNavParamList>
>;
export type BatteryAlertScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LoggedInNavParamList, "BatteryAlert">,
  NativeStackScreenProps<RootNavParamList>
>;
export type SuccessScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LoggedInNavParamList, "Success">,
  NativeStackScreenProps<RootNavParamList>
>;
export type EmergencyMissingStackNavScreenRouteProp = RouteProp<
  LoggedInNavParamList,
  "EmergencyMissingStackNav"
>;
export type DeleteAccountStackNavScreenRouteProp = RouteProp<
  LoggedInNavParamList,
  "DeleteAccountStackNav"
>;
export type WalkDetailDayScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LoggedInNavParamList, "WalkDetailDay">,
  NativeStackScreenProps<RootNavParamList>
>;
export type WalkDetailDayScreenRouteProp = WalkDetailDayScreenProps["route"];

export type EmergencyMissingStackNavParamList = {
  EmergencyMissingFirstPage: undefined;
  EmergencyMissingSecondPage: undefined;
};
export type EmergencyMissingFirstPageScreenNavigationProp =
  CompositeNavigationProp<
    NativeStackNavigationProp<
      EmergencyMissingStackNavParamList,
      "EmergencyMissingFirstPage"
    >,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >;
export type EmergencyMissingSecondPageScreenNavigationProp =
  CompositeNavigationProp<
    NativeStackNavigationProp<
      EmergencyMissingStackNavParamList,
      "EmergencyMissingSecondPage"
    >,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >;

export type DeleteAccountStackNavParamList = {
  DeleteAccountFirstPage: undefined;
  DeleteAccountSecondPage: undefined;
};
export type DeleteAccountFirstPageScreenNavigationProp =
  CompositeNavigationProp<
    NativeStackNavigationProp<
      DeleteAccountStackNavParamList,
      "DeleteAccountFirstPage"
    >,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >;
export type DeleteAccountSecondPageScreenNavigationProp =
  CompositeNavigationProp<
    NativeStackNavigationProp<
      DeleteAccountStackNavParamList,
      "DeleteAccountSecondPage"
    >,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >;

export type BleRootStackNavParamList = {
  BleWithHeaderStackNav:
    | {
        initialRouteName?: keyof BleWithHeaderStackNavParamList;
      }
    | undefined;
  BleWithoutHeaderStackNav:
    | {
        initialRouteName?: keyof BleWithoutHeaderStackNavParamList;
        loadingText?: string;
      }
    | undefined;
};
export type BleWithHeaderStackNavScreenRouteProp = RouteProp<
  BleRootStackNavParamList,
  "BleWithHeaderStackNav"
>;
export type BleWithHeaderStackNavScreenNavigationProp =
  NativeStackNavigationProp<BleWithHeaderStackNavParamList>;
export type BleWithoutHeaderStackNavScreenRouteProp = RouteProp<
  BleRootStackNavParamList,
  "BleWithoutHeaderStackNav"
>;

export type BleWithHeaderStackNavParamList = {
  ChargingCheck: undefined;
  PreWiFiForm: undefined;
  WiFiForm: undefined;
  PreArea: undefined;
  RegisterProfileFirst: undefined;
  RegisterProfileSecond: undefined;
};
export type ChargingCheckScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithHeaderStackNavParamList, "ChargingCheck">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type PreWiFiFormScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithHeaderStackNavParamList, "PreWiFiForm">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type WiFiFormScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithHeaderStackNavParamList, "WiFiForm">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type PreAreaScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithHeaderStackNavParamList, "PreArea">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type RegisterProfileFirstScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<
    BleWithHeaderStackNavParamList,
    "RegisterProfileFirst"
  >,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type RegisterProfileSecondScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<
    BleWithHeaderStackNavParamList,
    "RegisterProfileSecond"
  >,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;

export type BleWithoutHeaderStackNavParamList = {
  BleLoading: {
    loadingText: string;
  };
  Scanning: undefined;
  Fail: undefined;
  FirmwareProgress: undefined;
  Success: undefined;
  Area: undefined;
};
export type BleLoadingScreenScreenProps = CompositeScreenProps<
  NativeStackScreenProps<BleWithoutHeaderStackNavParamList, "BleLoading">,
  CompositeScreenProps<
    NativeStackScreenProps<BleRootStackNavParamList>,
    CompositeScreenProps<
      NativeStackScreenProps<LoggedInNavParamList>,
      NativeStackScreenProps<RootNavParamList>
    >
  >
>;
export type ScanningScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithoutHeaderStackNavParamList, "Scanning">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type FailScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithoutHeaderStackNavParamList, "Fail">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type SuccessScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithoutHeaderStackNavParamList, "Success">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type FirmwareProgressScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<
    BleWithoutHeaderStackNavParamList,
    "FirmwareProgress"
  >,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type AreaScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BleWithoutHeaderStackNavParamList, "Area">,
  CompositeNavigationProp<
    NativeStackNavigationProp<BleRootStackNavParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
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
  WalkTopTabNav:
    | {
        initialStartWalkingParams?: StartWalkingParams;
      }
    | undefined;
  Notification: undefined;
  MyPage: undefined;
  NotificationSetting: undefined;
  WalkDetailMonth: {
    deviceID: number;
    avatarUrl: string;
    name: string;
  };
  DeviceSetting: {
    deviceID: number;
    avatar: string;
    name: string;
  };
  DeviceManagement: undefined;
  UpdateNickname: undefined;
};
export type WalkTopTabNavRouteProp = RouteProp<
  SharedStackNavParamList,
  "WalkTopTabNav"
>;
export type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SharedStackNavParamList, "Home">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type NotificationScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SharedStackNavParamList, "Notification">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type MyPageScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SharedStackNavParamList, "MyPage">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type WalkDetailMonthScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SharedStackNavParamList, "WalkDetailMonth">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      NativeStackScreenProps<LoggedInNavParamList>,
      NativeStackScreenProps<RootNavParamList>
    >
  >
>;
export type DeviceManagementScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SharedStackNavParamList, "DeviceManagement">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type UpdateNicknameScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SharedStackNavParamList, "UpdateNickname">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      NativeStackNavigationProp<LoggedInNavParamList>,
      NativeStackNavigationProp<RootNavParamList>
    >
  >
>;
export type DeviceSettingScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SharedStackNavParamList, "DeviceSetting">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      NativeStackScreenProps<LoggedInNavParamList>,
      NativeStackScreenProps<RootNavParamList>
    >
  >
>;
export type DeviceSettingScreenNavigationProp =
  DeviceSettingScreenProps["navigation"];

export type WalkTopTabParamList = {
  StartWalking: StartWalkingParams | undefined;
  WalkRecord: undefined;
};
export type StartWalkingScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "StartWalking">,
  CompositeNavigationProp<
    NativeStackNavigationProp<SharedStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      CompositeNavigationProp<
        NativeStackNavigationProp<LoggedInNavParamList>,
        NativeStackNavigationProp<RootNavParamList>
      >
    >
  >
>;
export type StartWalkingScreenRouteProp = RouteProp<
  WalkTopTabParamList,
  "StartWalking"
>;
export type WalkRecordScreenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "WalkRecord">,
  CompositeNavigationProp<
    NativeStackNavigationProp<SharedStackNavParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<BottomTabParamList>,
      CompositeNavigationProp<
        NativeStackNavigationProp<LoggedInNavParamList>,
        NativeStackNavigationProp<RootNavParamList>
      >
    >
  >
>;
