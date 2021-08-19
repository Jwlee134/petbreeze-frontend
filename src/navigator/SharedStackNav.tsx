import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "~/screens/Notification";
import Home from "~/screens/Home";
import WalkTopTabNav from "./WalkTopTabNav";
import WalkDetail from "~/screens/Walk/WalkDetail";
import CustomHeader from "~/components/navigator/CustomHeader";

const Stack = createStackNavigator();

const SharedStack = ({
  screenName,
  initialWalkTab,
}: {
  screenName: string;
  initialWalkTab?: string;
}) => (
  <Stack.Navigator>
    {screenName === "Home" && (
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    )}
    {screenName === "Walk" && (
      <Stack.Screen
        name="WalkTopTabNav"
        initialParams={{
          initialTab: initialWalkTab,
        }}
        component={WalkTopTabNav}
        options={{
          header: props => <CustomHeader {...props}>산책</CustomHeader>,
        }}
      />
    )}
    {screenName === "Notification" && (
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          header: props => <CustomHeader {...props}>알림</CustomHeader>,
        }}
      />
    )}
    <Stack.Screen
      name="WalkDetail"
      component={WalkDetail}
      options={{ title: "산책기록" }}
    />
  </Stack.Navigator>
);

export default SharedStack;
