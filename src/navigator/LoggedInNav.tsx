import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import AddDevice from "~/screens/AddDevice";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";

const Stack = createStackNavigator();

const LoggedInNav = () => (
  <Stack.Navigator>
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
      }}
    />
  </Stack.Navigator>
);

export default LoggedInNav;
