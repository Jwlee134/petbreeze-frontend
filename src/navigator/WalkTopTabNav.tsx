import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import palette from "~/styles/palette";
import StartWalking from "~/screens/Walk/StartWalking";
import WalkRecord from "~/screens/Walk/WalkRecord";

const Tab = createMaterialTopTabNavigator();

const WalkTopTabNav = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: palette.blue_6e,
      inactiveTintColor: palette.gray_b4,
      labelStyle: {
        fontSize: 18,
        fontWeight: "bold",
        justifyContent: "center",
      },
      indicatorContainerStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: palette.gray_b4,
      },
      pressColor: "white",
      pressOpacity: 0.5,
    }}>
    <Tab.Screen
      name="StartWalking"
      component={StartWalking}
      options={{ tabBarLabel: "산책하기" }}
    />
    <Tab.Screen
      name="WalkRecord"
      component={WalkRecord}
      options={{ tabBarLabel: "산책 기록" }}
    />
  </Tab.Navigator>
);

export default WalkTopTabNav;
