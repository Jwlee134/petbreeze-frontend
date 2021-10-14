import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SharedStackNav from "./SharedStackNav";

import { useAppSelector } from "~/store";
import { BottomTabParamList } from "~/types/navigator";
import CustomBottomTabBar from "~/components/navigator/CustomBottomTabBar";
import userApi from "~/api/user";
import useAppState from "~/hooks/useAppState";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNav = () => {
  const initialRouteName = useAppSelector(
    state => state.navigator.initialBottomTabNavRouteName,
  );
  const appState = useAppState();
  const { data, refetch } = userApi.useGetNumOfNewNotificationsQuery();

  useEffect(() => {
    if (appState === "active") refetch();
  }, [appState]);

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={props => (
        <CustomBottomTabBar
          newNotifExists={data !== undefined && data !== 0}
          {...props}
        />
      )}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab">
        {() => <SharedStackNav screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen name="WalkTab">
        {() => <SharedStackNav screenName="Walk" />}
      </Tab.Screen>
      <Tab.Screen name="NotificationTab">
        {() => <SharedStackNav screenName="Notification" />}
      </Tab.Screen>
      <Tab.Screen name="MyPageTab">
        {() => <SharedStackNav screenName="MyPage" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNav;
