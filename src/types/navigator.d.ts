import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { IDevice } from "~/store/device";

export type RootNavParamList = {
  FirmwareUpdate: undefined;
  Start: undefined;
  LoggedInNav:
    | {
        initialRouteName?: "Permissions" | "WalkMap" | "RegisterDeviceStackNav";
        initialRouteName2?: "PreSafetyZone" | "RegisterProfileFirst";
      }
    | undefined;
};
export type FirmwareUpdateScreenNavigationProp = StackScreenProps<
  RootNavParamList,
  "FirmwareUpdate"
>;
export type StartScreenNavigationProp = StackScreenProps<
  RootNavParamList,
  "Start"
>;
export type LoggedInNavNavigationProp = StackScreenProps<
  RootNavParamList,
  "LoggedInNav"
>;
export type LoggedInNavRouteProp = RouteProp<RootNavParamList, "LoggedInNav">;

type LoggedInNavParamList = {
  Permissions: undefined;
  BottomTabNav: {
    initialTab?: string;
  };
  RegisterDeviceStackNav:
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
export type PermissionsScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "Permissions">,
  StackScreenProps<RootNavParamList>
>;
export type BottomTabNavNavigationProp = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "BottomTabNav">,
  StackScreenProps<RootNavParamList>
>;
export type BottomTabNavRouteProp = RouteProp<
  LoggedInNavParamList,
  "BottomTabNav"
>;
export type BleStackNavigationProp = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "RegisterDeviceStackNav">,
  StackScreenProps<RootNavParamList>
>;
export type BleStackNavRouteProp = RouteProp<
  LoggedInNavParamList,
  "RegisterDeviceStackNav"
>;
export type WalkMapScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "WalkMap">,
  StackScreenProps<RootNavParamList>
>;
export type DeleteAccountScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "DeleteAccount">,
  StackScreenProps<RootNavParamList>
>;
export type UpdateProfileScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "UpdateProfile">,
  StackScreenProps<RootNavParamList>
>;
export type UpdateProfileRouteProp = RouteProp<
  LoggedInNavParamList,
  "UpdateProfile"
>;
export type EmergencyMissingScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<LoggedInNavParamList, "EmergencyMissing">,
  StackScreenProps<RootNavParamList>
>;
export type EmergencyMissingRouteProp = RouteProp<
  LoggedInNavParamList,
  "EmergencyMissing"
>;

type RegisterDeviceNavParamList = {
  PreStart: undefined;
  BleProgress:
    | {
        isOtaUpdate?: boolean;
      }
    | undefined;
  PreSafetyZone: undefined;
  SafetyZone: undefined;
  RegisterProfileFirst: undefined;
  RegisterProfileSecond: undefined;
  RegisterProfileThird: undefined;
};
export type PreStartScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<RegisterDeviceNavParamList, "PreStart">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
  >
>;
export type BleProgressScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<RegisterDeviceNavParamList, "BleProgress">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
  >
>;
export type BleProgressRouteProp = RouteProp<
  RegisterDeviceNavParamList,
  "BleProgress"
>;
export type PreSafetyZoneScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<RegisterDeviceNavParamList, "PreSafetyZone">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
  >
>;
export type SafetyZoneScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<RegisterDeviceNavParamList, "SafetyZone">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
  >
>;
export type RegisterProfileFirstScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<RegisterDeviceNavParamList, "RegisterProfileFirst">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
  >
>;
export type RegisterProfileSecondScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<RegisterDeviceNavParamList, "RegisterProfileSecond">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
  >
>;
export type RegisterProfileThirdScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<RegisterDeviceNavParamList, "RegisterProfileThird">,
  CompositeScreenProps<
    StackScreenProps<LoggedInNavParamList>,
    StackScreenProps<RootNavParamList>
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
export type HomeScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<SharedStackNavParamList, "Home">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
    >
  >
>;
export type NotificationScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<SharedStackNavParamList, "Notification">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
    >
  >
>;
export type WalkDetailRouteProp = RouteProp<
  SharedStackNavParamList,
  "WalkDetail"
>;
export type DeviceSettingScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<SharedStackNavParamList, "DeviceSetting">,
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList>,
    CompositeScreenProps<
      StackScreenProps<LoggedInNavParamList>,
      StackScreenProps<RootNavParamList>
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
export type StartWalkingScreenNavigationProp = CompositeScreenProps<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "StartWalking">,
  CompositeScreenProps<
    StackScreenProps<WalkStackNavParamList>,
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabParamList>,
      CompositeScreenProps<
        StackScreenProps<LoggedInNavParamList>,
        StackScreenProps<RootNavParamList>
      >
    >
  >
>;
export type WalkRecordScreenNavigationProp = CompositeScreenProps<
  MaterialTopTabNavigationProp<WalkTopTabParamList, "WalkRecord">,
  CompositeScreenProps<
    StackScreenProps<WalkStackNavParamList>,
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabParamList>,
      CompositeScreenProps<
        StackScreenProps<LoggedInNavParamList>,
        StackScreenProps<RootNavParamList>
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
export type MyPageScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<MyPageStackNavParamList, "MyPage">,
  CompositeScreenProps<
    StackScreenProps<SharedStackNavParamList>,
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabParamList>,
      CompositeScreenProps<
        StackScreenProps<LoggedInNavParamList>,
        StackScreenProps<RootNavParamList>
      >
    >
  >
>;
export type DeviceSettingListScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<MyPageStackNavParamList, "DeviceSettingList">,
  CompositeScreenProps<
    StackScreenProps<SharedStackNavParamList>,
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabParamList>,
      CompositeScreenProps<
        StackScreenProps<LoggedInNavParamList>,
        StackScreenProps<RootNavParamList>
      >
    >
  >
>;
export type DeviceSettingListRouteProp = RouteProp<
  MyPageStackNavParamList,
  "DeviceSettingList"
>;
