import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "~/screens/Home";
import Location from "~/screens/Location";
import Profile from "~/screens/Profile";

import TabIcon from "~/components/TabIcon";
import palette from "~/styles/palette";

const Tab = createBottomTabNavigator();

const Main = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: palette.navy,
      inactiveTintColor: palette.navy,
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon name="home" focused={focused} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Location"
      component={Location}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon name="map" focused={focused} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon name="person" focused={focused} size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Main;
