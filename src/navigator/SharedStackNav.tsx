import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Witnessed from "~/screens/Shared/Witnessed";
import Notification from "~/screens/Notification";
import AuthSelector from "~/screens/Shared/AuthSelector";
import Location from "~/screens/Location";
import MyMenuStackNav from "./MyMenuStackNav";
import Lost from "~/screens/Shared/Lost";
import HomeStackNav from "./HomeStackNav";
import AddDevice from "~/screens/Shared/AddDevice";
import { headerTitleStyle } from "~/styles/navigator";

const Stack = createStackNavigator();

const SharedStack = ({ screenName }: { screenName: string }) => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
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
    <Stack.Screen name="Lost" component={Lost} />
    <Stack.Screen name="Witnessed" component={Witnessed} />
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
