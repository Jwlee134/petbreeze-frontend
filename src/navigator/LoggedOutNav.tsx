import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Initialization from "~/screens/Initialization";

const Stack = createStackNavigator();

const LoggedOutNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Initialization" component={Initialization} />
  </Stack.Navigator>
);

export default LoggedOutNav;
