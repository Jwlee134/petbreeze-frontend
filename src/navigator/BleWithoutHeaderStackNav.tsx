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
import { BleWithoutHeaderStackNavParamList } from "~/types/navigator";
import ScanningFail from "~/screens/bleWithoutHeaderStackNav/ScanningFail";
import BleLoading from "~/screens/bleWithoutHeaderStackNav/BleLoading";
import Completion from "~/screens/bleWithoutHeaderStackNav/Completion";
import { useAppSelector } from "~/store";

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator<BleWithoutHeaderStackNavParamList>();

const BleWithoutHeaderStackNav = () => {
  const initialRouteName = useAppSelector(
    state => state.navigator.initialBleWithoutHeaderStackNavRouteName,
  );

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
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
      <Stack.Screen name="BleLoading" component={BleLoading} />
      <Stack.Screen name="Completion" component={Completion} />
    </Stack.Navigator>
  );
};

export default BleWithoutHeaderStackNav;
