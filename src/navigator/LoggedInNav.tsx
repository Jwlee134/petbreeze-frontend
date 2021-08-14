import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import AddDevice from "~/screens/AddDevice";
import WalkMap from "~/screens/WalkMap";
import CustomHeader from "~/components/common/CustomHeader";
import { store } from "~/store";
import { Linking } from "react-native";
import { isIos } from "~/utils";

const Stack = createStackNavigator();

const LoggedInNav = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("BottomTabNav");

  useEffect(() => {
    const { coords } = store.getState().storage.walk;
    if (coords.length !== 0) {
      setInitialRoute("WalkMap");
    }
    setIsLoading(false);

    if (isIos) return;

    Linking.getInitialURL()
      .then(url => {
        if (url === "petbreeze://walk/map") {
          setInitialRoute("WalkMap");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return null;

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDevice}
        options={{
          title: "기기 등록",
        }}
      />
      <Stack.Screen
        name="WalkMap"
        component={WalkMap}
        options={{
          header: () => <CustomHeader>산책하기</CustomHeader>,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
