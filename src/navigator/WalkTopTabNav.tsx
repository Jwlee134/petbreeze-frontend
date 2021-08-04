import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import palette from "~/styles/palette";
import StartWalking from "~/screens/Walk/StartWalking";
import WalkRecord from "~/screens/Walk/WalkRecord";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";

const Tab = createMaterialTopTabNavigator();

const WalkTopTabNav = () => (
  <SafeAreaContainer>
    <Tab.Navigator>
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
  </SafeAreaContainer>
);

export default WalkTopTabNav;
