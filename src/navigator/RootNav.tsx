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
import Intro from "~/screens/rootNav/Intro";

const Stack = createStackNavigator<RootNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootNav = () => {
  const isPermissionAllowed = useAppSelector(
    state => state.storage.init.isPermissionAllowed,
  );

  useEffect(() => {
    if (isPermissionAllowed) {
      Blemanager.start({ showAlert: false }).then(() => {
        console.log("BLE Module is initialized.");
      });
    }
  }, [isPermissionAllowed]);

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
        initialRouteName={(() => {
          const { isCodePushUpdated, isIntroPassed } =
            store.getState().storage.init;
          if (!isCodePushUpdated) {
            return "FirmwareUpdate";
          }
          if (!isIntroPassed) {
            return "Intro";
          }
          return "Start";
        })()}>
        <Stack.Screen name="FirmwareUpdate" component={FirmwareUpdate} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
      </Stack.Navigator>
    </>
  );
};

export default RootNav;
