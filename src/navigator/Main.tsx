import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeBottomTab from "./HomeBottomTabNav";
import KakaoAuth from "~/screens/Auth/KakaoAuth";

const Stack = createStackNavigator();

const Main = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeBottomTab"
      component={HomeBottomTab}
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
