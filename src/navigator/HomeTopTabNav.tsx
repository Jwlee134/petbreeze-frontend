import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import palette from "~/styles/palette";
import PostList from "~/screens/Home/PostList";

const Tab = createMaterialTopTabNavigator();

const HomeTopTapNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: palette.blue_6e,
      inactiveTintColor: "black",
      labelStyle: {
        fontSize: 16,
        justifyContent: "center",
      },
      style: {
        elevation: 0,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        marginHorizontal: 25,
      },
      pressColor: "white",
      pressOpacity: 0.5,
    }}>
    <Tab.Screen
      name="LostList"
      component={PostList}
      options={{ tabBarLabel: "잃어버렸어요" }}
    />
    <Tab.Screen
      name="WitnessedList"
      component={PostList}
      options={{ tabBarLabel: "목격했어요" }}
    />
  </Tab.Navigator>
);

export default HomeTopTapNavigator;
