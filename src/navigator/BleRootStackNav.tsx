import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React, { useEffect } from "react";
import useBleMaganer from "~/hooks/useBleManager";
import BleWithoutHeaderStackNav from "./BleWithoutHeaderStackNav";
import BleWithHeaderStackNav from "./BleWithHeaderStackNav";
import { BleRootStackNavParamList } from "~/types/navigator";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { deviceSettingActions } from "~/store/deviceSetting";
import { navigatorActions } from "~/store/navigator";
import { bleActions } from "~/store/ble";

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator<BleRootStackNavParamList>();

const BleRootStackNav = () => {
  const initialRouteName = useAppSelector(
    state => state.navigator.initialBleRootStackNavRouteName,
  );
  const dispatch = useDispatch();
  useBleMaganer();

  useEffect(() => {
    return () => {
      dispatch(bleActions.reset());
      dispatch(deviceSettingActions.setSafetyZone(null));
      dispatch(deviceSettingActions.setProfile(null));
      dispatch(deviceSettingActions.setWifi(null));
      dispatch(
        navigatorActions.setInitialRoute({
          initialBleWithHeaderStackNavRouteName: "ChargingCheck",
          initialBleWithoutHeaderStackNavRouteName: "Scanning",
        }),
      );
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        cardStyleInterpolator: forFade,
        headerShown: false,
      }}>
      <Stack.Screen
        name="BleWithHeaderStackNav"
        component={BleWithHeaderStackNav}
      />
      <Stack.Screen
        name="BleWithoutHeaderStackNav"
        component={BleWithoutHeaderStackNav}
      />
    </Stack.Navigator>
  );
};

export default BleRootStackNav;
