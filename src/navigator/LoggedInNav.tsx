import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import { AppState, AppStateStatus } from "react-native";
import AddDevice from "~/screens/AddDevice";
import { headerStyle, mainTabHeaderStyle } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import WalkMap from "~/screens/WalkMap";

const Stack = createStackNavigator();

const LoggedInNav = () => {
  const [state, setState] = useState<AppStateStatus>();

  const handleAppStateChange = (status: AppStateStatus) => {
    setState(status);
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (!state || state === "active") {
      console.log("foreground");
    } else if (state === "background") {
      console.log("background");
    }
  }, [state]);

  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerBackImage: () => <HeaderBackButton />,
        ...mainTabHeaderStyle,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDevice}
        options={{
          title: "기기 등록",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="WalkMap"
        component={WalkMap}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
