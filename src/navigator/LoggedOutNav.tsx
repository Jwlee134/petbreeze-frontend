import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Init from "~/screens/Init";

const Stack = createStackNavigator();

const LoggedOutNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Init" component={Init} />
  </Stack.Navigator>
);

export default LoggedOutNav;
