import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeviceSetting from "~/screens/MyMenu/DeviceSetting";
import LocationCollectInterval from "~/screens/MyMenu/DeviceSetting/LocationCollectInterval";
import SafetyZoneSetting from "~/screens/MyMenu/DeviceSetting/SafetyZoneSetting";
import WifiSSID from "~/screens/MyMenu/DeviceSetting/WifiSSID";
import DeviceList from "~/screens/MyMenu/DeviceSetting/DeviceList";

const Stack = createStackNavigator();

const DeviceSettingStackNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DeviceSetting"
      component={DeviceSetting}
      options={{
        headerTitle: "기기 환경설정",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="DeviceList"
      component={DeviceList}
      options={{
        headerTitle: "기기 목록",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="LocationCollectInterval"
      component={LocationCollectInterval}
      options={{
        headerTitle: "위치정보 수집주기",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="SafetyZoneSetting"
      component={SafetyZoneSetting}
      options={{
        headerTitle: "안심존 설정",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="WifiSSID"
      component={WifiSSID}
      options={{
        headerTitle: "와이파이 등록",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
);

export default DeviceSettingStackNav;
