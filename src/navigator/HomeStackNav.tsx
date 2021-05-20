import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostAnimalInfo from "~/screens/Home/PostAnimalInfo";
import Home from "~/screens/Home";
import { useAppSelector } from "~/store";

const Stack = createStackNavigator();

const HomeStackNav = () => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const { isLoggedIn } = useAppSelector(state => state.user);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostAnimalInfo"
        component={PostAnimalInfo}
        options={{
          headerShown: !isLoggedIn ? false : true,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNav;
