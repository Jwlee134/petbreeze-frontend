import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WitnessedDetail from "~/screens/Shared/WitnessedDetail";
import Notification from "~/screens/Notification";
import AuthSelector from "~/screens/Shared/AuthSelector";
import Location from "~/screens/Location";
import MyMenuStackNav from "./MyMenuStackNav";
import LostDetail from "~/screens/Shared/LostDetail";
import HomeStackNav from "./HomeStackNav";
import AddDevice from "~/screens/Shared/AddDevice";
import { headerTitleStyle, stackNavScreenOptions } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";

const Stack = createStackNavigator();

const SharedStack = ({ screenName }: { screenName: string }) => (
  <Stack.Navigator
    screenOptions={{
      headerBackImage: () => <HeaderBackButton />,
      ...stackNavScreenOptions,
    }}>
    {screenName === "Home" && (
      <Stack.Screen
        name="HomeStackNav"
        component={HomeStackNav}
        options={{ headerShown: false }}
      />
    )}
    {screenName === "Location" && (
      <Stack.Screen
        name="Location"
        component={Location}
        options={{ headerShown: false }}
      />
    )}
    {screenName === "Notification" && (
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
    )}
    {screenName === "MyMenu" && (
      <Stack.Screen
        name="MyMenuStackNav"
        component={MyMenuStackNav}
        options={{
          headerShown: false,
        }}
      />
    )}
    <Stack.Screen name="AuthSelector" component={AuthSelector} />
    <Stack.Screen
      name="LostDetail"
      component={LostDetail}
      options={{ title: "" }}
    />
    <Stack.Screen
      name="WitnessedDetail"
      component={WitnessedDetail}
      options={{ title: "" }}
    />
    <Stack.Screen
      name="AddDevice"
      component={AddDevice}
      options={{
        headerTitle: "기기 등록",
        headerTitleStyle,
      }}
    />
  </Stack.Navigator>
);

export default SharedStack;
