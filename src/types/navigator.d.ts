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
export type LoggedInNavScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootNavParamList>,
  StackNavigationProp<LoggedInNavParamList>
>;
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
  MissingReportStackNav: {
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
  StackNavigationProp<LoggedInNavParamList, "Policy">,
  StackNavigationProp<RootNavParamList>
>;
export type PermissionScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "Permission">,
  StackNavigationProp<RootNavParamList>
>;
export type AddDeviceScreenProps = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "AddDevice">,
  StackScreenProps<RootNavParamList>
>;
export type InvitationCodeFormScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "InvitationCodeForm">,
  StackNavigationProp<RootNavParamList>
>;
export type WalkMapScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "WalkMap">,
  StackNavigationProp<RootNavParamList>
>;
export type UpdateAreaScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "UpdateArea">,
  StackNavigationProp<RootNavParamList>
>;
export type WelcomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<LoggedInNavParamList, "Welcome">,
  StackNavigationProp<RootNavParamList>
>;
export type UpdateProfileScreenProps = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "UpdateProfile">,
  StackScreenProps<RootNavParamList>
>;
export type UpdateWiFiScreenProps = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "UpdateWiFi">,
  StackScreenProps<RootNavParamList>
>;
export type BatteryAlertScreenProps = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "BatteryAlert">,
  StackScreenProps<RootNavParamList>
>;
export type SuccessScreenProps = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "Success">,
  StackScreenProps<RootNavParamList>
>;
export type MissingReportStackNavScreenRouteProp = RouteProp<
  LoggedInNavParamList,
  "MissingReportStackNav"
>;
export type DeleteAccountStackNavScreenRouteProp = RouteProp<
  LoggedInNavParamList,
  "DeleteAccountStackNav"
>;
export type WalkDetailDayScreenProps = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "WalkDetailDay">,
  StackScreenProps<RootNavParamList>
>;
export type WalkDetailDayScreenRouteProp = WalkDetailDayScreenProps["route"];

export type MissingReportStackNavParamList = {
  MissingReportFirstPage: undefined;
  MissingReportSecondPage: undefined;
};
export type MissingReportFirstPageScreenNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<
      MissingReportStackNavParamList,
      "MissingReportFirstPage"
    >,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >;
export type MissingReportSecondPageScreenNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<
      MissingReportStackNavParamList,
      "MissingReportSecondPage"
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
  StackNavigationProp<BleWithHeaderStackNavParamList>;
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
export type PreAreaScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithHeaderStackNavParamList, "PreArea">,
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
  StackScreenProps<BleWithoutHeaderStackNavParamList, "BleLoading">,
  CompositeScreenProps<
    StackScreenProps<BleRootStackNavParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
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
export type AreaScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BleWithoutHeaderStackNavParamList, "Area">,
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
export type DeviceManagementScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "DeviceManagement">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type UpdateNicknameScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SharedStackNavParamList, "UpdateNickname">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
      StackNavigationProp<LoggedInNavParamList>,
      StackNavigationProp<RootNavParamList>
    >
  >
>;
export type DeviceSettingScreenProps = CompositeScreenProps<
  StackScreenProps<SharedStackNavParamList, "DeviceSetting">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
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
export type StartWalkingScreenRouteProp = RouteProp<
  WalkTopTabParamList,
  "StartWalking"
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
