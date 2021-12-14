import React from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import { StatusBar } from "react-native";
import FirmwareUpdate from "~/screens/rootNav/FirmwareUpdate";
import Start from "~/screens/rootNav/Start";
import { RootNavParamList } from "~/types/navigator";
import Intro from "~/screens/rootNav/Intro";
import Auth from "~/screens/rootNav/Auth";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<RootNavParamList>();

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
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: { opacity: current.progress },
          }),
        }}
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
