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
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import RegisterProfileSecond from "~/screens/bleWithHeaderStackNav/RegisterProfileSecond";
import PreWiFiForm from "~/screens/bleWithHeaderStackNav/PreWiFiForm";
import WiFiForm from "~/screens/bleWithHeaderStackNav/WiFiForm";
import { useAppSelector } from "~/store";
import { storageActions } from "~/store/storage";
import { useDispatch } from "react-redux";

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
  const {
    init: { isInitialized },
    device: { redirectionRouteName },
  } = useAppSelector(state => state.storage);
  const initialRouteName = useAppSelector(
    state => state.navigator.initialBleWithHeaderStackNavRouteName,
  );
  const routeName = getFocusedRouteNameFromRoute(route) || initialRouteName;
  const dispatch = useDispatch();

  return (
    <>
      <CustomHeader
        disableBackButton={
          (routeName === "DeviceCheck" && !isInitialized) ||
          routeName === "PreWiFiForm"
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
          if (routeName === "ChargingCheck") {
            if (redirectionRouteName) {
              navigation.goBack();
              dispatch(
                storageActions.setDevice({
                  redirectionRouteName: "",
                }),
              );
            } else {
              navigation.replace("DeviceCheck");
            }
          }
          if (routeName === "WiFiForm") navigation.replace("PreWiFiForm");
          if (routeName === "RegisterProfileSecond")
            navigation.replace("RegisterProfileFirst");
        }}
      />
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ cardStyleInterpolator: forFade, headerShown: false }}>
        <Stack.Screen name="DeviceCheck" component={DeviceCheck} />
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
      </Stack.Navigator>
    </>
  );
};

export default BleWithHeaderStackNav;
