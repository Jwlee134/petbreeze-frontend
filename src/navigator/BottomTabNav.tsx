import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import palette from "~/styles/palette";
import SharedStackNav from "./SharedStackNav";
import TabIcon from "~/components/common/TabIcon";

const Tab = createBottomTabNavigator();

const BottomTabNav = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: palette.navy,
      inactiveTintColor: palette.navy,
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
      }}>
      {() => <SharedStackNav screenName="Home" />}
    </Tab.Screen>
    <Tab.Screen
      name="Location"
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
      }}>
      {() => <SharedStackNav screenName="Location" />}
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
      }}>
      {() => <SharedStackNav screenName="MyMenu" />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default BottomTabNav;
