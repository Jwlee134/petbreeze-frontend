import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import { useDispatch } from "react-redux";
import Fail from "~/components/lottie/Fail";
import useBleMaganer from "~/hooks/useBleManager";
import FirmwareProgress from "~/screens/bleStackNav/FirmwareProgress";
import Scanning from "~/screens/bleStackNav/Scanning";
import Success from "~/screens/bleStackNav/Success";
import SafetyZone from "~/screens/bleStackNav/SafetyZone";
import { useAppSelector } from "~/store";

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();

const BleStackNav = ({ route }) => {
  const bleStatus = useAppSelector(state => state.common.bleStatus);
  const dispatch = useDispatch();
  const { downloadingProgress, installingProgress } = useBleMaganer({
    isOtaUpdate: route.params?.isOtaUpdate,
  });

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: forFade,
        headerShown: false,
      }}>
      <Stack.Screen name="Scanning" component={Scanning} />
      <Stack.Screen name="Fail" component={Fail} />
      <Stack.Screen name="FirmwareProgress" component={FirmwareProgress} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="SafetyZone" component={SafetyZone} />
    </Stack.Navigator>
  );
};

export default BleStackNav;
