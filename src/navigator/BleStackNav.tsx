import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import BleProgress from "~/screens/bleNav/BleProgress";
import BluetoothCheck from "~/screens/bleNav/BluetoothCheck";
import PreSafetyZone from "~/screens/bleNav/PreSafetyZone";
import PreStart from "~/screens/bleNav/PreStart";
import RegisterProfileFirst from "~/screens/bleNav/registerProfile/RegisterProfileFirst";
import RegisterProfileSecond from "~/screens/bleNav/registerProfile/RegisterProfileSecond";
import RegisterProfileThird from "~/screens/bleNav/registerProfile/RegisterProfileThird";
import SafetyZone from "~/screens/bleNav/SafetyZone";
import { BleStackNavRouteProp } from "~/types/navigator";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const BleStackNav = ({ route }: { route: BleStackNavRouteProp }) => {
  return (
    <Stack.Navigator
      initialRouteName={route.params?.initialRouteName || "PreStart"}
      screenOptions={{ cardStyleInterpolator: forFade, headerShown: false }}>
      <Stack.Screen name="PreStart" component={PreStart} />
      <Stack.Screen name="BluetoothCheck" component={BluetoothCheck} />
      <Stack.Screen name="BleProgress" component={BleProgress} />
      <Stack.Screen name="PreSafetyZone" component={PreSafetyZone} />
      <Stack.Screen name="SafetyZone" component={SafetyZone} />
      <Stack.Screen
        name="RegisterProfileFirst"
        component={RegisterProfileFirst}
      />
      <Stack.Screen
        name="RegisterProfileSecond"
        component={RegisterProfileSecond}
      />
      <Stack.Screen
        name="RegisterProfileThird"
        component={RegisterProfileThird}
      />
    </Stack.Navigator>
  );
};

export default BleStackNav;
