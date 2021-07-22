import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import AddDevice from "~/screens/AddDevice";
import { headerStyle, mainTabHeaderStyle } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";

const Stack = createStackNavigator();

const LoggedInNav = () => (
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
  </Stack.Navigator>
);

export default LoggedInNav;
