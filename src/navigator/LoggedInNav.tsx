import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import WalkMap from "~/screens/loggedInNav/WalkMap";
import CustomHeader from "~/components/navigator/CustomHeader";
import { store, useAppSelector } from "~/store";

import messaging from "@react-native-firebase/messaging";
import Permissions from "~/screens/loggedInNav/Permissions";
import {
  LoggedInNavParamList,
  LoggedInNavScreenProps,
} from "~/types/navigator";
import UpdateProfile from "~/screens/loggedInNav/UpdateProfile";
import EmergencyMissingStackNav from "./EmergencyMissingStackNav";
import BleRootStackNav from "./BleRootStackNav";
import UpdateWiFi from "~/screens/loggedInNav/UpdateWiFi";
import DeviceAlert from "~/screens/loggedInNav/DeviceAlert";
import DeleteAccountStackNav from "./DeleteAccountStackNav";
import WalkContextProvider from "~/context/WalkContext";

const Stack = createStackNavigator<LoggedInNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const LoggedInNav = ({ navigation, route }: LoggedInNavScreenProps) => {
  const initialRouteName = useAppSelector(
    state => state.navigator.initialLoggedInNavRouteName,
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage,
      );
    });

    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        cardStyleInterpolator: forFade,
        detachPreviousScreen: false,
      }}>
      <Stack.Screen
        name="Permissions"
        component={Permissions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BleRootStackNav"
        component={BleRootStackNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmergencyMissingStackNav"
        component={EmergencyMissingStackNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteAccountStackNav"
        component={DeleteAccountStackNav}
        options={{
          header: props => <CustomHeader {...props}>탈퇴하기</CustomHeader>,
        }}
      />
      <Stack.Screen name="WalkMap" options={{ headerShown: false }}>
        {() => (
          <WalkContextProvider>
            <WalkMap />
          </WalkContextProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UpdateWiFi"
        component={UpdateWiFi}
        options={{
          header: props => <CustomHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          header: props => <CustomHeader {...props}>프로필 수정</CustomHeader>,
        }}
      />
      <Stack.Screen
        name="DeviceAlert"
        component={DeviceAlert}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
