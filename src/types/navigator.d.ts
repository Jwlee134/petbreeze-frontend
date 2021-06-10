import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

type SharedStackParamList = {
  Home: undefined;
  Location: undefined;
  Community: undefined;
  Notification: undefined;
  PostAnimalInfo: undefined;
  LostDetail: {
    id: number;
  };
  WitnessedDetail: {
    id: number;
  };
  UpdateWitnessedList: undefined;
  CommentList: undefined;
  AuthSelector: undefined;
  AddDevice: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Home"
>;
export type LocationScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Location"
>;
export type CommunityScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Community"
>;
export type NotificationScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Notification"
>;
export type PostAnimalInfoScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "PostAnimalInfo"
>;
export type LostDetailScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "LostDetail"
>;
export type CommentScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "CommentList"
>;
export type AuthSelectorScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "AuthSelector"
>;

type PostListTabParamList = {
  PostList: undefined;
  LostDetail: {
    id: number;
  };
  WitnessedDetail: {
    id: number;
  };
};

export type PostScreenNavigationProp = StackNavigationProp<
  PostListTabParamList,
  "PostList"
>;
export type LostDetailScreenRouteProp = RouteProp<
  PostListTabParamList,
  "LostDetail"
>;
export type WitnessedDetailScreenRouteProp = RouteProp<
  PostListTabParamList,
  "WitnessedDetail"
>;

type MyMenuStackParamList = {
  MyMenu: undefined;
  DeviceSettingStackNav: undefined;
  PetProfile: undefined;
  PassManagement: undefined;
  ServiceCenter: undefined;
  NotificationSetting: undefined;
  DeleteAccount: undefined;
  MyPost: undefined;
  SavedPost: undefined;
  Home: undefined;
};

export type MyMenuScreenNavigationProp = StackNavigationProp<
  MyMenuStackParamList,
  "MyMenu"
>;

type DeviceSettingStackParamList = {
  DeviceSetting: undefined;
  DeviceList: undefined;
  AddDevice: undefined;
  LocationCollectInterval: undefined;
  SafetyZoneSetting: undefined;
  WifiSSID: undefined;
};

export type DeviceSettingScreenNavigationProp = StackNavigationProp<
  DeviceSettingStackParamList,
  "DeviceSetting"
>;
export type DeviceListScreenNavigationProp = StackNavigationProp<
  DeviceSettingStackParamList,
  "DeviceList"
>;
export type SafetyZoneScreenNavigationProp = StackNavigationProp<
  DeviceSettingStackParamList,
  "SafetyZoneSetting"
>;
