import React from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import { StatusBar } from "react-native";
import FirmwareUpdate from "~/screens/rootNav/FirmwareUpdate";
import Start from "~/screens/rootNav/Start";
import { RootNavParamList } from "~/types/navigator";
import Intro from "~/screens/rootNav/Intro";
import Auth from "~/screens/rootNav/Auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootNavParamList>();

const RootNav = () => {
  const { isCodePushUpdated, isIntroPassed } = useAppSelector(
    state => state.storage.init,
  );

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade" }}
        initialRouteName={(() => {
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
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
      </Stack.Navigator>
    </>
  );
};

export default RootNav;
