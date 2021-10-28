import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import PreSafetyZone from "~/screens/bleWithHeaderStackNav/PreSafetyZone";
import DeviceCheck from "~/screens/bleWithHeaderStackNav/DeviceCheck";
import RegisterProfileFirst from "~/screens/bleWithHeaderStackNav/RegisterProfileFirst";
import {
  BleWithHeaderStackNavParamList,
  BleWithHeaderStackNavScreenNavigationProp,
  BleWithHeaderStackNavScreenRouteProp,
} from "~/types/navigator";
import ChargingCheck from "~/screens/bleWithHeaderStackNav/ChargingCheck";
import CustomHeader from "~/components/navigator/CustomHeader";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import RegisterProfileSecond from "~/screens/bleWithHeaderStackNav/RegisterProfileSecond";
import PreWiFiForm from "~/screens/bleWithHeaderStackNav/PreWiFiForm";
import WiFiForm from "~/screens/bleWithHeaderStackNav/WiFiForm";

const Stack = createStackNavigator<BleWithHeaderStackNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const BleWithHeaderStackNav = ({
  navigation,
  route,
}: {
  navigation: BleWithHeaderStackNavScreenNavigationProp;
  route: BleWithHeaderStackNavScreenRouteProp;
}) => {
  const routeName =
    getFocusedRouteNameFromRoute(route) || route.params?.initialRouteName;

  return (
    <>
      <CustomHeader
        disableBackButton={
          routeName === "DeviceCheck" || routeName === "PreWiFiForm"
        }
        currentPage={
          routeName?.includes("WiFi")
            ? 1
            : routeName === "PreSafetyZone"
            ? 2
            : routeName === "RegisterProfileFirst"
            ? 3
            : routeName === "RegisterProfileSecond"
            ? 4
            : undefined
        }
        totalPage={4}
        navigation={navigation}
        onBackButtonPress={() => {
          if (routeName === "WiFiForm") navigation.replace("PreWiFiForm");
          else if (routeName === "RegisterProfileSecond")
            navigation.replace("RegisterProfileFirst");
          else navigation.goBack();
        }}
      />
      <Stack.Navigator
        initialRouteName={route.params?.initialRouteName}
        screenOptions={{ cardStyleInterpolator: forFade, headerShown: false }}>
        <Stack.Screen name="ChargingCheck" component={ChargingCheck} />
        <Stack.Screen name="PreWiFiForm" component={PreWiFiForm} />
        <Stack.Screen name="PreSafetyZone" component={PreSafetyZone} />
        <Stack.Screen name="WiFiForm" component={WiFiForm} />
        <Stack.Screen
          name="RegisterProfileFirst"
          component={RegisterProfileFirst}
        />
        <Stack.Screen
          name="RegisterProfileSecond"
          component={RegisterProfileSecond}
        />
        <Stack.Screen name="DeviceCheck" component={DeviceCheck} />
      </Stack.Navigator>
    </>
  );
};

export default BleWithHeaderStackNav;
