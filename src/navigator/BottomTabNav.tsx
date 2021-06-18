import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import palette from "~/styles/palette";
import SharedStackNav from "./SharedStackNav";
import TabIcon from "~/components/common/TabIcon";
import { Platform } from "react-native";

import Footprint from "~/assets/svg/footprint.svg";
import FootprintOutline from "~/assets/svg/footprint-outline.svg";

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        /* showLabel: false,
        activeTintColor: palette.blue_2e,
        inactiveTintColor: palette.blue_2e, */
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
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              type="Ionicons"
              name="home"
              focused={focused}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "홈",
        }}>
        {() => <SharedStackNav screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen
        name="Walk"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Footprint />
            ) : (
              <FootprintOutline stroke="gray" strokeWidth={0.5} />
            ),
          tabBarLabel: "산책",
        }}>
        {() => <SharedStackNav screenName="Walk" />}
      </Tab.Screen>
      <Tab.Screen
        name="Community"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              type="Ionicons"
              name="map"
              focused={focused}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "커뮤니티",
        }}>
        {() => <SharedStackNav screenName="Community" />}
      </Tab.Screen>
      <Tab.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              type="MaterialCommunityIcons"
              name="bell"
              focused={focused}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "알림",
        }}>
        {() => <SharedStackNav screenName="Notification" />}
      </Tab.Screen>
      <Tab.Screen
        name="MyMenu"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              type="Ionicons"
              name="person"
              focused={focused}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "마이 페이지",
        }}>
        {() => <SharedStackNav screenName="MyMenu" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNav;
