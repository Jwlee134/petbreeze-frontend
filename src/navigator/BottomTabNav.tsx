import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import palette from "~/styles/palette";
import SharedStackNav from "./SharedStackNav";

import Home from "~/assets/svg/tab/home.svg";
import HomeOutline from "~/assets/svg/tab/home-outline.svg";
import Footprint from "~/assets/svg/tab/footprint.svg";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import Bell from "~/assets/svg/tab/bell.svg";
import BellOutline from "~/assets/svg/tab/bell-outline.svg";
import User from "~/assets/svg/tab/user.svg";
import UserOutline from "~/assets/svg/tab/user-outline.svg";
import CustomHeader from "~/components/navigator/CustomHeader";
import { BottomTabNavRouteProp } from "~/types/navigator";
import WalkStackNav from "./WalkStackNav";
import { rpWidth } from "~/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const BottomTabNav = ({ route }: { route: BottomTabNavRouteProp }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={
        route?.params?.initialTab?.includes("Walk") ? "WalkStackNav" : "HomeTab"
      }
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: palette.blue_7b,
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.3)",
        tabBarStyle: {
          height: rpWidth(52) + bottom,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Home width={rpWidth(24)} height={rpWidth(23)} />
            ) : (
              <HomeOutline width={rpWidth(24)} height={rpWidth(23)} />
            ),
        }}>
        {() => <SharedStackNav screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen
        name="WalkStackNav"
        component={WalkStackNav}
        initialParams={{
          initialTab: route?.params?.initialTab,
        }}
        options={{
          header: () => <CustomHeader>산책</CustomHeader>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Footprint width={rpWidth(25)} height={rpWidth(24)} />
            ) : (
              <FootprintOutline width={rpWidth(25)} height={rpWidth(24)} />
            ),
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Bell width={rpWidth(21)} height={rpWidth(24)} />
            ) : (
              <BellOutline width={rpWidth(21)} height={rpWidth(24)} />
            ),
        }}>
        {() => <SharedStackNav screenName="Notification" />}
      </Tab.Screen>
      <Tab.Screen
        name="MyPageTab"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <User width={rpWidth(22)} height={rpWidth(23)} />
            ) : (
              <UserOutline width={rpWidth(22)} height={rpWidth(23)} />
            ),
        }}>
        {() => <SharedStackNav screenName="MyPage" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNav;
