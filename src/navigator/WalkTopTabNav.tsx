import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import StartWalking from "~/screens/walkTopTabNav/StartWalking";
import CustomTopTabBar from "~/components/navigator/CustomTopTabBar";
import WalkRecord from "~/screens/walkTopTabNav/WalkRecord";
import useDevice from "~/hooks/useDevice";

const Tab = createMaterialTopTabNavigator();

const WalkTopTabNav = () => {
  const deviceList = useDevice();

  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => (
        <CustomTopTabBar {...props} />
      )}>
      <Tab.Screen name="StartWalking" options={{ tabBarLabel: "산책하기" }}>
        {props => <StartWalking {...props} deviceList={deviceList || []} />}
      </Tab.Screen>
      <Tab.Screen name="WalkRecord" options={{ tabBarLabel: "산책기록" }}>
        {props => <WalkRecord {...props} deviceList={deviceList || []} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default WalkTopTabNav;
