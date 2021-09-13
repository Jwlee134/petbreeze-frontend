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
        name="WalkMap"
        component={WalkMap}
        options={{
          header: props => <CustomHeader {...props}>산책하기</CustomHeader>,
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          header: props => <CustomHeader {...props}>프로필 수정</CustomHeader>,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
