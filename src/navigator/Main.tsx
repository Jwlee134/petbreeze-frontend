import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import { AppState, AppStateStatus } from "react-native";
import CommentList from "~/screens/CommentList";
import AddDevice from "~/screens/AddDevice";
import { headerTitleStyle, stackNavScreenOptions } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";

const Stack = createStackNavigator();

const Main = () => {
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
        ...stackNavScreenOptions,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CommentList"
        component={CommentList}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDevice}
        options={{
          title: "기기 등록",
          headerTitleStyle,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
