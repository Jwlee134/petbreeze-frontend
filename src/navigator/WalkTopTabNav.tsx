import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import StartWalking from "~/screens/walkTopTabNav/StartWalking";
import { WalkTopTabRouteProp } from "~/types/navigator";
import CustomTopTabBar from "~/components/navigator/CustomTopTabBar";
import WalkRecord from "~/screens/walkTopTabNav/WalkRecord";

const Tab = createMaterialTopTabNavigator();

const WalkTopTabNav = ({ route }: { route: WalkTopTabRouteProp }) => (
  <Tab.Navigator
    initialRouteName={route?.params?.initialTab || "StartWalking"}
    tabBar={(props: MaterialTopTabBarProps) => <CustomTopTabBar {...props} />}>
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
