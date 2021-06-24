import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera } from "react-native-maps";

type SharedStackParamList = {
  Home: undefined;
  Community: undefined;
  Notification: undefined;
  PostAnimalInfo: undefined;
  PostList: undefined;
  LostDetail: {
    id: number;
  };
  WitnessedDetail: {
    id: number;
  };
  UpdateWitnessedList: undefined;
  CommentList: undefined;
  AuthSelector: undefined;
  AddDevice:
    | {
        execute: boolean;
      }
    | undefined;
  Map: undefined;
  StartWalking: undefined;
  WalkMap: undefined;
  MyPage: undefined;
  PetProfile: undefined;
  PassManagement: undefined;
  ServiceCenter: undefined;
  NotificationSetting: undefined;
  DeleteAccount: undefined;
  MyPost: undefined;
  SavedPost: undefined;
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

export type HomeScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Home"
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
export type MapScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Map"
>;
export type StartWalkingScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "StartWalking"
>;
export type WalkMapScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "WalkMap"
>;
export type PostScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "PostList"
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
export type LostDetailScreenRouteProp = RouteProp<
  SharedStackParamList,
  "LostDetail"
>;
export type WitnessedDetailScreenRouteProp = RouteProp<
  SharedStackParamList,
  "WitnessedDetail"
>;
export type SafetyZoneMapScreenRouteProp = RouteProp<
  SharedStackParamList,
  "SafetyZoneMap"
>;
export type AddDeviceScreenRouteProp = RouteProp<
  SharedStackParamList,
  "AddDevice"
>;
