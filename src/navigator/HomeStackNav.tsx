import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostAnimalInfo from "~/screens/Home/PostAnimalInfo";
import Home from "~/screens/Home";
import { useAppSelector } from "~/store";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";

const Stack = createStackNavigator();

const HomeStackNav = () => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <HeaderBackButton />,
        headerPressColorAndroid: "transparent",
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
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNav;
