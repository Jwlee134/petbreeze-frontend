import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Notification from "~/screens/Notification";
import { headerStyle, mainTabHeaderStyle } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import Home from "~/screens/Home";
import MyPage from "~/screens/MyPage";
import PetProfile from "~/screens/MyPage/PetProfile";
import PassManagement from "~/screens/MyPage/PassManagement";
import ServiceCenter from "~/screens/MyPage/ServiceCenter";
import NotificationSetting from "~/screens/MyPage/NotificationSetting";
import DeleteAccount from "~/screens/MyPage/DeleteAccount";
import DeviceSetting from "~/screens/MyPage/DeviceSetting";
import DeviceList from "~/screens/MyPage/DeviceList";
import LocationCollectInterval from "~/screens/MyPage/LocationCollectInterval";
import SafetyZoneSetting from "~/screens/MyPage/SafetyZoneSetting";
import SafetyZoneMap from "~/screens/MyPage/SafetyZoneMap";

const Stack = createStackNavigator();

const SharedStack = ({ screenName }: { screenName: string }) => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerBackImage: () => <HeaderBackButton />,
      ...mainTabHeaderStyle,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    {screenName === "Home" && (
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    )}
    {screenName === "Notification" && (
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ title: "알림" }}
      />
    )}
    {screenName === "MyPage" && (
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: "마이페이지",
        }}
      />
    )}
    {/* <Stack.Screen
      name="PetProfile"
      component={PetProfile}
      options={{
        headerTitle: "반려동물 프로필",
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="PassManagement"
      component={PassManagement}
      options={{
        headerTitle: "이용권 관리",
        ...headerStyle,
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
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="DeleteAccount"
      component={DeleteAccount}
      options={{
        headerTitle: "탈퇴하기",
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="DeviceSetting"
      component={DeviceSetting}
      options={{
        title: "환경설정",
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="DeviceList"
      component={DeviceList}
      options={{
        title: "기기 목록",
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="LocationCollectInterval"
      component={LocationCollectInterval}
      options={{
        title: "위치정보 수집주기",
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="SafetyZoneSetting"
      component={SafetyZoneSetting}
      options={{
        title: "안심존 설정",
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="SafetyZoneMap"
      component={SafetyZoneMap}
      options={{
        title: "",
      }}
    /> */}
  </Stack.Navigator>
);

export default SharedStack;
