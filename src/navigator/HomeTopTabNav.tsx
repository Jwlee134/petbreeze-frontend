import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import palette from "~/styles/palette";
import Lost from "~/screens/Shared/Lost";
import Witnessed from "~/screens/Shared/Witnessed";

const Tab = createMaterialTopTabNavigator();

const HomeTopTapNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: palette.blue,
      inactiveTintColor: "black",
      labelStyle: {
        fontSize: 14,
        fontWeight: "bold",
        justifyContent: "center",
      },
      style: {
        elevation: 0,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
      pressColor: "transparent",
    }}
    sceneContainerStyle={{
      paddingHorizontal: 24,
    }}>
    <Tab.Screen
      name="Lost"
      component={Lost}
      options={{ tabBarLabel: "잃어버렸어요" }}
    />
    <Tab.Screen
      name="Witnessed"
      component={Witnessed}
      options={{ tabBarLabel: "목격했어요" }}
    />
  </Tab.Navigator>
);

export default HomeTopTapNavigator;
