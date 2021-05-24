import { RouteProp } from "@react-navigation/core";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";

type SharedStackParamList = {
  Home: undefined;
  Location: undefined;
  Notification: undefined;
  MyMenu: undefined;
  AuthSelector: undefined;
  Lost: undefined;
  Witnessed: undefined;
  KakaoAuth: undefined;
  LocalAuth: undefined;
  PostAnimalInfo: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Home"
>;
export type LocationScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Location"
>;
export type NotificationScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Notification"
>;
export type AuthSelectorScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "AuthSelector"
>;
export type LostScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Lost"
>;
export type WitnessedScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Witnessed"
>;
export type PostAnimalInfoScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "PostAnimalInfo"
>;

/* type HomeTopTabParamList = {
  Lost: undefined;
  Witnessed: undefined;
};

export type LostTapScreenNavigationProp = MaterialTopTabNavigationProp<
  HomeTopTabParamList,
  "Lost"
>;
export type LostTapRouteProp = RouteProp<HomeTopTabParamList, "Lost">;
export type WitnessedTapScreenNavigationProp = MaterialTopTabNavigationProp<
  HomeTopTabParamList,
  "Witnessed"
>;
export type WitnessedTapRouteProp = RouteProp<HomeTopTabParamList, "Witnessed">;
 */

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
  LocationCollectInterval: undefined;
  SafetyZoneSetting: undefined;
  WifiSSID: undefined;
};

export type DeviceSettingScreenNavigationProp = StackNavigationProp<
  DeviceSettingStackParamList,
  "DeviceSetting"
>;
