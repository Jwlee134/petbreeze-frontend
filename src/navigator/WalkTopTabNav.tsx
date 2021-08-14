import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StartWalking from "~/screens/Walk/StartWalking";
import WalkRecord from "~/screens/Walk/WalkRecord";
import { rpWidth } from "~/styles";
import { WalkTopTabRouteProp } from "~/types/navigator";

const Tab = createMaterialTopTabNavigator();

const WalkTopTabNav = ({ route }: { route: WalkTopTabRouteProp }) => (
  <Tab.Navigator
    initialRouteName={route?.params?.initialTab || "StartWalking"}
    tabBarOptions={{
      labelStyle: {
        fontSize: rpWidth(14),
        fontFamily: "NotoSansKR-Regular",
        includeFontPadding: false,
      },
      style: {
        shadowColor: "transparent",
      },
    }}>
    <Tab.Screen
      name="StartWalking"
      component={StartWalking}
      options={{ tabBarLabel: "산책하기" }}
    />
    <Tab.Screen
      name="WalkRecord"
      component={WalkRecord}
      options={{ tabBarLabel: "산책기록" }}
    />
  </Tab.Navigator>
);

export default WalkTopTabNav;
