import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostAnimalInfo from "~/screens/Home/PostAnimalInfo";
import Home from "~/screens/Home";
import { useAppSelector } from "~/store";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import { stackNavScreenOptions } from "~/styles/navigator";

const Stack = createStackNavigator();

const HomeStackNav = () => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => <HeaderBackButton />,
        ...stackNavScreenOptions,
      }}>
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
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNav;
