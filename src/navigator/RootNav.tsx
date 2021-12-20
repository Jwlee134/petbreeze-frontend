import React, { useMemo } from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import { StatusBar } from "react-native";
import FirmwareUpdate from "~/screens/rootNav/FirmwareUpdate";
import Start from "~/screens/rootNav/Start";
import { RootNavParamList } from "~/types/navigator";
import Intro from "~/screens/rootNav/Intro";
import Auth from "~/screens/rootNav/Auth";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import theme from "~/styles/theme";
import { useFlipper } from "@react-navigation/devtools";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import toastStyle, { ToastType } from "~/styles/toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Stack = createStackNavigator<RootNavParamList>();

const RootNav = () => {
  const navigationRef = useNavigationContainerRef();
  const { isCodePushUpdated, isIntroPassed } = useAppSelector(
    state => state.storage.init,
  );
  const { top } = useSafeAreaInsets();

  useFlipper(navigationRef);

  const toastConfig = useMemo(
    () => ({
      notification: ({ ...rest }: BaseToastProps) => (
        <BaseToast {...rest} {...toastStyle(ToastType.Notification)} />
      ),
      error: ({ ...rest }: BaseToastProps) => (
        <BaseToast {...rest} {...toastStyle(ToastType.Error)} />
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
      <NavigationContainer ref={navigationRef} theme={theme}>
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
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={top + 11} />
    </>
  );
};

export default RootNav;
