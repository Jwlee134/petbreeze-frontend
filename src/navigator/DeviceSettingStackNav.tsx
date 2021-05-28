import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeviceSetting from "~/screens/MyMenu/DeviceSetting";
import LocationCollectInterval from "~/screens/MyMenu/DeviceSetting/LocationCollectInterval";
import SafetyZoneSetting from "~/screens/MyMenu/DeviceSetting/SafetyZoneSetting";
import WifiSSID from "~/screens/MyMenu/DeviceSetting/WifiSSID";
import DeviceList from "~/screens/MyMenu/DeviceSetting/DeviceList";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import { headerTitleStyle } from "~/styles/navigator";

const Stack = createStackNavigator();

const DeviceSettingStackNav = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackImage: () => <HeaderBackButton />,
      headerPressColorAndroid: "transparent",
    }}>
    <Stack.Screen
      name="DeviceSetting"
      component={DeviceSetting}
      options={{
        headerTitle: "환경설정",
        headerTitleStyle,
      }}
    />
    <Stack.Screen
      name="DeviceList"
      component={DeviceList}
      options={{
        headerTitle: "기기 목록",
        headerTitleStyle,
      }}
    />
    <Stack.Screen
      name="LocationCollectInterval"
      component={LocationCollectInterval}
      options={{
        headerTitle: "위치정보 수집주기",
        headerTitleStyle,
      }}
    />
    <Stack.Screen
      name="SafetyZoneSetting"
      component={SafetyZoneSetting}
      options={{
        headerTitle: "안심존 설정",
        headerTitleStyle,
      }}
    />
    <Stack.Screen
      name="WifiSSID"
      component={WifiSSID}
      options={{
        headerTitle: "와이파이 등록",
        headerTitleStyle,
      }}
    />
  </Stack.Navigator>
);

export default DeviceSettingStackNav;
