import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React, { useEffect } from "react";
import useBleMaganer from "~/hooks/useBleManager";
import BleWithoutHeaderStackNav from "./BleWithoutHeaderStackNav";
import BleWithHeaderStackNav from "./BleWithHeaderStackNav";
import {
  BleRootStackNavParamList,
  BleRootStackNavRouteProp,
} from "~/types/navigator";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { deviceSettingActions } from "~/store/deviceSetting";
import { bleActions } from "~/store/ble";

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator<BleRootStackNavParamList>();

const BleRootStackNav = ({ route }: { route: BleRootStackNavRouteProp }) => {
  const fromDeviceSetting = useAppSelector(
    state => state.deviceSetting.safetyZone.fromDeviceSetting,
  );
  const dispatch = useDispatch();
  useBleMaganer();

  useEffect(() => {
    return () => {
      if (!fromDeviceSetting) {
        dispatch(bleActions.reset());
        dispatch(deviceSettingActions.setProfile(null));
        dispatch(deviceSettingActions.setWifi(null));
      }
      dispatch(deviceSettingActions.setSafetyZone(null));
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={route.params?.initialRouteName}
      screenOptions={{
        cardStyleInterpolator: forFade,
        headerShown: false,
      }}>
      <Stack.Screen
        name="BleWithHeaderStackNav"
        initialParams={{
          initialRouteName: route.params?.initialBleWithHeaderStackNavRouteName,
        }}
        component={BleWithHeaderStackNav}
      />
      <Stack.Screen
        name="BleWithoutHeaderStackNav"
        initialParams={{
          initialRouteName:
            route.params?.initialBleWithoutHeaderStackNavRouteName,
        }}
        component={BleWithoutHeaderStackNav}
      />
    </Stack.Navigator>
  );
};

export default BleRootStackNav;
