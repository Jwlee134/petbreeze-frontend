import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyMenu from "~/screens/MyMenu";
import PetProfile from "~/screens/MyMenu/PetProfile";
import PassManagement from "~/screens/MyMenu/PassManagement";
import ServiceCenter from "~/screens/MyMenu/ServiceCenter";
import NotificationSetting from "~/screens/MyMenu/NotificationSetting";
import DeleteAccount from "~/screens/MyMenu/DeleteAccount";
import MyPost from "~/screens/MyMenu/MyPost";
import SavedPost from "~/screens/MyMenu/SavedPost";
import DeviceSettingStackNav from "./DeviceSettingStackNav";
import { useAppSelector } from "~/store";
import HeaderBackButton from "~/components/common/HeaderBackButton";
import { headerTitleStyle } from "~/styles/navigator";

const Stack = createStackNavigator();

const MyMenuStackNav = () => {
  const { isLoggedIn } = useAppSelector(state => state.user);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <HeaderBackButton />,
        headerPressColorAndroid: "transparent",
      }}>
      <Stack.Screen
        name="MyMenu"
        component={MyMenu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeviceSettingStackNav"
        component={DeviceSettingStackNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PetProfile"
        component={PetProfile}
        options={{
          headerTitle: "반려동물 프로필",
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="PassManagement"
        component={PassManagement}
        options={{
          headerTitle: "이용권 관리",
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="ServiceCenter"
        component={ServiceCenter}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{
          headerTitle: "알림 설정",
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerTitle: "탈퇴하기",
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="MyPost"
        component={MyPost}
        options={{
          headerTitle: "내가 쓴 게시물",
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="SavedPost"
        component={SavedPost}
        options={{
          headerTitle: "저장한 게시물",
          headerTitleStyle,
        }}
      />
    </Stack.Navigator>
  );
};

export default MyMenuStackNav;
