import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "~/screens/Auth";

const Stack = createStackNavigator();

const LoggedOutNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Auth" component={Auth} />
  </Stack.Navigator>
);

export default LoggedOutNav;
