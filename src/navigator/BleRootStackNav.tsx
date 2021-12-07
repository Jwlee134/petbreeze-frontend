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
import { useDispatch } from "react-redux";
import { bleActions } from "~/store/ble";
import { formActions } from "~/store/form";
import { deviceSettingActions } from "~/store/deviceSetting";

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator<BleRootStackNavParamList>();

const BleRootStackNav = ({
  route: {
    params: {
      initialBleWithHeaderStackNavRouteName,
      initialBleWithoutHeaderStackNavRouteName,
      initialRouteName,
    } = {},
  },
}: {
  route: BleRootStackNavRouteProp;
}) => {
  const dispatch = useDispatch();
  useBleMaganer();

  useEffect(() => {
    return () => {
      dispatch(bleActions.reset());
      dispatch(formActions.setState(null));
      dispatch(deviceSettingActions.setArea(null));
      dispatch(deviceSettingActions.setAreaDraft(null));
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
        initialParams={{
          initialRouteName: initialBleWithHeaderStackNavRouteName,
        }}
        component={BleWithHeaderStackNav}
      />
      <Stack.Screen
        name="BleWithoutHeaderStackNav"
        initialParams={{
          initialRouteName: initialBleWithoutHeaderStackNavRouteName,
        }}
        component={BleWithoutHeaderStackNav}
      />
    </Stack.Navigator>
  );
};

export default BleRootStackNav;
