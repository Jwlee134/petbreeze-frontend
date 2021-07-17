import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import Walk from "~/screens/Walk";
import WalkMap from "~/screens/Walk/WalkMap";

const Stack = createStackNavigator();

const WalkStackNav = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <Stack.Screen name="Walk" component={Walk} />
    <Stack.Screen name="WalkMap" component={WalkMap} />
  </Stack.Navigator>
);

export default WalkStackNav;
