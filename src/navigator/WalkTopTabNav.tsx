import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import StartWalking from "~/screens/walkTopTabNav/StartWalking";
import CustomTopTabBar from "~/components/navigator/CustomTopTabBar";
import WalkRecord from "~/screens/walkTopTabNav/WalkRecord";
import { WalkTopTabNavRouteProp } from "~/types/navigator";

const Tab = createMaterialTopTabNavigator();

const WalkTopTabNav = ({
  route: { params: { initialStartWalkingParams } = {} },
}: {
  route: WalkTopTabNavRouteProp;
}) => {
  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => (
        <CustomTopTabBar {...props} />
      )}>
      <Tab.Screen
        name="StartWalking"
        initialParams={initialStartWalkingParams}
        options={{ tabBarLabel: "산책하기" }}
        component={StartWalking}
      />
      <Tab.Screen
        name="WalkRecord"
        options={{ tabBarLabel: "산책기록" }}
        component={WalkRecord}
      />
    </Tab.Navigator>
  );
};

export default WalkTopTabNav;
