import React, { useMemo } from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import { StatusBar } from "react-native";
import FirmwareUpdate from "~/screens/rootNav/FirmwareUpdate";
import Start from "~/screens/rootNav/Start";
import { RootNavParamList } from "~/types/navigator";
import Intro from "~/screens/rootNav/Intro";
import Auth from "~/screens/rootNav/Auth";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import toastStyle, { ToastType } from "~/styles/toast";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootNavParamList>();

const RootNav = () => {
  const { isCodePushUpdated, isIntroPassed } = useAppSelector(
    state => state.storage.init,
  );
  const { top } = useSafeAreaInsets();

  const toastConfig = useMemo(
    () => ({
      notification: ({ ...rest }: BaseToastProps) => (
        <BaseToast {...rest} {...toastStyle(top, ToastType.Notification)} />
      ),
      error: ({ ...rest }: BaseToastProps) => (
        <BaseToast {...rest} {...toastStyle(top, ToastType.Error)} />
      ),
    }),
    [],
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
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default RootNav;
