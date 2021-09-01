import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import AddDevice from "~/screens/AddDevice";
import WalkMap from "~/screens/WalkMap";
import CustomHeader from "~/components/navigator/CustomHeader";
import { store } from "~/store";
import DeleteAccount from "~/screens/DeleteAccount";
import UpdateProfile from "~/screens/UpdateProfile";

import messaging from "@react-native-firebase/messaging";
import EmergencyMissing from "~/screens/EmergencyMissing";

const Stack = createStackNavigator();

const LoggedInNav = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) return null;

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDevice}
        options={{
          title: "기기 등록",
        }}
      />
      <Stack.Screen
        name="WalkMap"
        component={WalkMap}
        options={{
          header: props => <CustomHeader {...props}>산책하기</CustomHeader>,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          header: props => (
            <CustomHeader useBackButton {...props}>
              탈퇴하기
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          header: props => (
            <CustomHeader useBackButton {...props}>
              프로필 수정
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="EmergencyMissing"
        component={EmergencyMissing}
        options={{
          header: props => (
            <CustomHeader useBackButton usePageIndicator {...props}>
              긴급실종
            </CustomHeader>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
