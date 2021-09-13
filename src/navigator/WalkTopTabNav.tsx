import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import StartWalking from "~/screens/walkTopTabNav/StartWalking";
import CustomTopTabBar from "~/components/navigator/CustomTopTabBar";
import WalkRecord from "~/screens/walkTopTabNav/WalkRecord";
import { useAppSelector } from "~/store";

const Tab = createMaterialTopTabNavigator();

const WalkTopTabNav = () => {
  const initialRouteName = useAppSelector(
    state => state.navigator.initialWalkTopTabNavRouteName,
  );

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={(props: MaterialTopTabBarProps) => (
        <CustomTopTabBar {...props} />
      )}>
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
};

export default WalkTopTabNav;
