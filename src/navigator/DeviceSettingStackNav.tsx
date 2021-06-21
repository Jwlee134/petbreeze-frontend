import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import DeviceSetting from "~/screens/MyMenu/DeviceSetting";
import LocationCollectInterval from "~/screens/MyMenu/DeviceSetting/LocationCollectInterval";
import SafetyZoneSetting from "~/screens/MyMenu/DeviceSetting/SafetyZoneSetting";
import DeviceList from "~/screens/MyMenu/DeviceSetting/DeviceList";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import { headerStyle, mainTabHeaderStyle } from "~/styles/navigator";
import SafetyZoneMap from "~/screens/MyMenu/DeviceSetting/SafetyZoneMap";

const Stack = createStackNavigator();

const DeviceSettingStackNav = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerBackImage: () => <HeaderBackButton />,
      ...mainTabHeaderStyle,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
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
    />
  </Stack.Navigator>
);

export default DeviceSettingStackNav;
