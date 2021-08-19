import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import WalkDetail from "~/screens/Walk/WalkDetail";
import { WalkStackNavRouteProp } from "~/types/navigator";
import WalkTopTabNav from "./WalkTopTabNav";

const Stack = createStackNavigator();

const WalkStackNav = ({ route }: { route: WalkStackNavRouteProp }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="WalkTopTab"
      initialParams={{
        initialTab: route?.params?.initialTab
          ? route?.params?.initialTab
          : undefined,
      }}
      component={WalkTopTabNav}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default WalkStackNav;
