import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import PreSafetyZone from "~/screens/registerDeviceStackNav/PreSafetyZone";
import PreStart from "~/screens/registerDeviceStackNav/PreStart";
import RegisterProfileFirst from "~/screens/registerDeviceStackNav/RegisterProfileFirst";
import {
  BleStackNavigationProp,
  BleStackNavRouteProp,
} from "~/types/navigator";
import BleStackNav from "./BleStackNav";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RegisterDeviceStackNav = ({
  navigation,
  route,
}: {
  navigation: BleStackNavigationProp;
  route: BleStackNavRouteProp;
}) => {
  return (
    <Stack.Navigator
      initialRouteName={route.params?.initialRouteName || "PreStart"}
      screenOptions={{ cardStyleInterpolator: forFade, headerShown: false }}>
      <Stack.Screen name="PreStart" component={PreStart} />
      <Stack.Screen name="PreSafetyZone" component={PreSafetyZone} />
      <Stack.Screen
        name="RegisterProfileFirst"
        component={RegisterProfileFirst}
      />
    </Stack.Navigator>
  );
};

export default RegisterDeviceStackNav;
