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
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<BleWithoutHeaderStackNavParamList>();

const BleWithoutHeaderStackNav = ({
  route: { params: { initialRouteName, loadingText } = {} },
}: {
  route: BleWithoutHeaderStackNavScreenRouteProp;
}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: { opacity: current.progress },
        }),
      }}>
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
