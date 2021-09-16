import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import useBleMaganer from "~/hooks/useBleManager";
import BleWithoutHeaderStackNav from "./BleWithoutHeaderStackNav";
import BleWithHeaderStackNav from "./BleWithHeaderStackNav";
import { BleRootStackNavParamList } from "~/types/navigator";
import { useAppSelector } from "~/store";

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
  useBleMaganer();

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
