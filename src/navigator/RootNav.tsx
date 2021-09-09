import React, { useEffect } from "react";
import { store, useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import { StatusBar } from "react-native";

import Blemanager from "react-native-ble-manager";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import FirmwareUpdate from "~/screens/rootNav/FirmwareUpdate";
import Start from "~/screens/rootNav/Start";
import { RootNavParamList } from "~/types/navigator";

const Stack = createStackNavigator<RootNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootNav = () => {
  /*   useEffect(() => {
    if (isPermissonAllowed)
      Blemanager.start({ showAlert: false }).then(() => {
        console.log("BLE Module is initialized.");
      });
  }, [isPermissonAllowed]); */

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: forFade,
          headerShown: false,
        }}
        initialRouteName={
          !store.getState().storage.init.isCodePushUpdated
            ? "FirmwareUpdate"
            : "Start"
        }>
        <Stack.Screen name="FirmwareUpdate" component={FirmwareUpdate} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
      </Stack.Navigator>
    </>
  );
};

export default RootNav;
