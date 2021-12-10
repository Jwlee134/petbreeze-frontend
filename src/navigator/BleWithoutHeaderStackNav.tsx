import React from "react";
import Fail from "~/screens/bleWithoutHeaderStackNav/Fail";
import FirmwareProgress from "~/screens/bleWithoutHeaderStackNav/FirmwareProgress";
import Scanning from "~/screens/bleWithoutHeaderStackNav/Scanning";
import Success from "~/screens/bleWithoutHeaderStackNav/Success";
import Area from "~/screens/bleWithoutHeaderStackNav/Area";
import {
  BleWithoutHeaderStackNavParamList,
  BleWithoutHeaderStackNavScreenRouteProp,
} from "~/types/navigator";
import BleLoading from "~/screens/bleWithoutHeaderStackNav/BleLoading";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<BleWithoutHeaderStackNavParamList>();

const BleWithoutHeaderStackNav = ({
  route: { params: { initialRouteName, loadingText } = {} },
}: {
  route: BleWithoutHeaderStackNavScreenRouteProp;
}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="Scanning" component={Scanning} />
      <Stack.Screen name="Fail" component={Fail} />
      <Stack.Screen name="FirmwareProgress" component={FirmwareProgress} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Area" component={Area} />
      <Stack.Screen
        name="BleLoading"
        initialParams={{ loadingText }}
        component={BleLoading}
      />
    </Stack.Navigator>
  );
};

export default BleWithoutHeaderStackNav;
