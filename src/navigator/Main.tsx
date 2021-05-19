import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import KakaoAuth from "~/screens/Auth/KakaoAuth";

const Stack = createStackNavigator();

const Main = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BottomTabNav"
      component={BottomTabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="KakaoAuth"
      component={KakaoAuth}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Main;
