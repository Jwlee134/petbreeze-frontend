import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import WalkMap from "~/screens/Walk/WalkMap";
import { store } from "~/store";
import WalkTopTabNav from "./WalkTopTabNav";

const Stack = createStackNavigator();

const WalkStackNav = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("WalkTopTab");

  useEffect(() => {
    const { coords } = store.getState().storage.walk;
    if (coords.length !== 0) {
      setInitialRoute("WalkMap");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalkTopTab" component={WalkTopTabNav} />
      <Stack.Screen name="WalkMap" component={WalkMap} />
    </Stack.Navigator>
  );
};

export default WalkStackNav;
