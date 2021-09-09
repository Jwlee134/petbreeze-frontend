import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import WalkMap from "~/screens/loggedInNav/WalkMap";
import CustomHeader from "~/components/navigator/CustomHeader";
import { store } from "~/store";

import messaging from "@react-native-firebase/messaging";
import RegisterDeviceStackNav from "./RegisterDeviceStackNav";
import Permissions from "~/screens/loggedInNav/Permissions";
import { LoggedInNavRouteProp } from "~/types/navigator";
import UpdateProfile from "~/screens/loggedInNav/UpdateProfile";
import EmergencyMissing from "~/screens/loggedInNav/EmergencyMissing";
import BleStackNav from "./BleStackNav";
import DeleteAccountStackNav from "./DeleteAccountStackNav";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const LoggedInNav = ({ route }: { route: LoggedInNavRouteProp }) => {
  /* const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("BottomTabNav");

  useEffect(() => {
    const { coords } = store.getState().storage.walk;
    if (coords.length) {
      setInitialRoute("WalkMap");
    }
    setIsLoading(false);
  }, []);

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

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage,
          );
        }
      });

    messaging()
      .getToken()
      .then(value => console.log("Token: ", value));

    return unsubscribe;
  }, []);

  if (isLoading) return null; */

  return (
    <Stack.Navigator
      initialRouteName={route.params?.initialRouteName || "BottomTabNav"}
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
        name="RegisterDeviceStackNav"
        component={RegisterDeviceStackNav}
        initialParams={
          route.params?.initialRouteName2
            ? { initialRouteName: route.params.initialRouteName2 }
            : undefined
        }
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BleStackNav"
        component={BleStackNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalkMap"
        component={WalkMap}
        options={{
          header: props => <CustomHeader {...props}>산책하기</CustomHeader>,
        }}
      />
      <Stack.Screen
        name="DeleteAccountStackNav"
        component={DeleteAccountStackNav}
        options={{
          header: props => <CustomHeader {...props}>탈퇴하기</CustomHeader>,
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
        name="EmergencyMissing"
        component={EmergencyMissing}
        options={{
          header: props => <CustomHeader {...props}>긴급실종</CustomHeader>,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
