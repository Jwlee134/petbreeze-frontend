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
