import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import palette from "~/styles/palette";
import SharedStackNav from "./SharedStackNav";
import { Platform } from "react-native";

import Home from "~/assets/svg/tab/home.svg";
import HomeOutline from "~/assets/svg/tab/home-outline.svg";
import Footprint from "~/assets/svg/tab/footprint.svg";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import Bell from "~/assets/svg/tab/bell.svg";
import BellOutline from "~/assets/svg/tab/bell-outline.svg";
import User from "~/assets/svg/tab/user.svg";
import UserOutline from "~/assets/svg/tab/user-outline.svg";

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: palette.blue_6e,
        inactiveTintColor: "#808080",
        labelStyle: {
          marginTop: -5,
          marginBottom: Platform.OS === "android" ? 10 : 0,
        },
        style: {
          height: Platform.OS === "ios" ? 80 : 60,
          justifyContent: "center",
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (focused ? <Home /> : <HomeOutline />),
          tabBarLabel: "홈",
        }}>
        {() => <SharedStackNav screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen
        name="Walk"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Footprint /> : <FootprintOutline />,
          tabBarLabel: "산책",
        }}>
        {() => <SharedStackNav screenName="Walk" />}
      </Tab.Screen>
      <Tab.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ focused }) => (focused ? <Bell /> : <BellOutline />),
          tabBarLabel: "알림",
        }}>
        {() => <SharedStackNav screenName="Notification" />}
      </Tab.Screen>
      <Tab.Screen
        name="MyPage"
        options={{
          tabBarIcon: ({ focused }) => (focused ? <User /> : <UserOutline />),
          tabBarLabel: "마이페이지",
        }}>
        {() => <SharedStackNav screenName="MyPage" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNav;
