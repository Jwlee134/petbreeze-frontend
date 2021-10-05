import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SharedStackNav from "./SharedStackNav";

import { useAppSelector } from "~/store";
import { BottomTabParamList } from "~/types/navigator";
import CustomBottomTabBar from "~/components/navigator/CustomBottomTabBar";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNav = () => {
  const initialRouteName = useAppSelector(
    state => state.navigator.initialBottomTabNavRouteName,
  );

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={props => <CustomBottomTabBar {...props} />}
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
