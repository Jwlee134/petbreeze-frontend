import React, { useMemo } from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import { StatusBar } from "react-native";

import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import FirmwareUpdate from "~/screens/rootNav/FirmwareUpdate";
import Start from "~/screens/rootNav/Start";
import { RootNavParamList } from "~/types/navigator";
import Intro from "~/screens/rootNav/Intro";
import Auth from "~/screens/rootNav/Auth";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import palette from "~/styles/palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isAndroid } from "~/utils";

const Stack = createStackNavigator<RootNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootNav = () => {
  const { isCodePushUpdated, isIntroPassed } = useAppSelector(
    state => state.storage.init,
  );
  const { top } = useSafeAreaInsets();

  const toastConfig = useMemo(
    () => ({
      notification: ({ ...rest }: BaseToastProps) => (
        <BaseToast
          {...rest}
          style={{
            borderLeftColor: palette.blue_86,
            borderLeftWidth: 7,
            height: "auto",
            marginTop: top,
          }}
          contentContainerStyle={{
            paddingLeft: 14,
            paddingVertical: 10,
            height: "auto",
          }}
          text1Style={{
            ...(isAndroid && { fontWeight: "normal" }),
            fontSize: 15,
            fontFamily: "NotoSansKR-Bold",
            includeFontPadding: false,
          }}
          text2Style={{
            fontSize: 15,
            fontFamily: "NotoSansKR-Regular",
            includeFontPadding: false,
          }}
          trailingIconContainerStyle={{
            width: 40,
          }}
          trailingIconStyle={{
            width: 10,
            height: 10,
          }}
          onTrailingIconPress={Toast.hide}
        />
      ),
      error: (props: BaseToastProps) => (
        <BaseToast
          {...props}
          style={{
            borderLeftColor: palette.red_f0,
            borderLeftWidth: 7,
            height: "auto",
            marginTop: top,
          }}
          contentContainerStyle={{
            paddingLeft: 14,
            paddingVertical: 10,
            height: "auto",
          }}
          text1Style={{
            ...(isAndroid && { fontWeight: "normal" }),
            fontSize: 15,
            fontFamily: "NotoSansKR-Bold",
            includeFontPadding: false,
          }}
          text2Style={{
            fontSize: 15,
            fontFamily: "NotoSansKR-Regular",
            includeFontPadding: false,
          }}
          trailingIconContainerStyle={{
            width: 40,
          }}
          trailingIconStyle={{
            width: 10,
            height: 10,
          }}
          onTrailingIconPress={Toast.hide}
        />
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
        screenOptions={{
          cardStyleInterpolator: forFade,
          headerShown: false,
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
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default RootNav;
