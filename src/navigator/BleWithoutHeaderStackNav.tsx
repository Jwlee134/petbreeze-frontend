import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import Fail from "~/screens/bleWithoutHeaderStackNav/Fail";
import FirmwareProgress from "~/screens/bleWithoutHeaderStackNav/FirmwareProgress";
import Scanning from "~/screens/bleWithoutHeaderStackNav/Scanning";
import Success from "~/screens/bleWithoutHeaderStackNav/Success";
import SafetyZone from "~/screens/bleWithoutHeaderStackNav/SafetyZone";
import {
  BleWithoutHeaderStackNavParamList,
  BleWithoutHeaderStackNavScreenRouteProp,
} from "~/types/navigator";
import ScanningFail from "~/screens/bleWithoutHeaderStackNav/ScanningFail";
import BleLoading from "~/screens/bleWithoutHeaderStackNav/BleLoading";
import Completion from "~/screens/bleWithoutHeaderStackNav/Completion";

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator<BleWithoutHeaderStackNavParamList>();

const BleWithoutHeaderStackNav = ({
  route,
}: {
  route: BleWithoutHeaderStackNavScreenRouteProp;
}) => {
  return (
    <Stack.Navigator
      initialRouteName={route.params?.initialRouteName}
      screenOptions={{
        cardStyleInterpolator: forFade,
        headerShown: false,
      }}>
      <Stack.Screen name="Scanning" component={Scanning} />
      <Stack.Screen name="ScanningFail" component={ScanningFail} />
      <Stack.Screen name="FirmwareProgress" component={FirmwareProgress} />
      <Stack.Screen name="Fail" component={Fail} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="SafetyZone" component={SafetyZone} />
      <Stack.Screen
        name="BleLoading"
        initialParams={{ loadingText: route.params?.loadingText }}
        component={BleLoading}
      />
      <Stack.Screen name="Completion" component={Completion} />
    </Stack.Navigator>
  );
};

export default BleWithoutHeaderStackNav;
