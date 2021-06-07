import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import WitnessedDetail from "~/screens/Shared/WitnessedDetail";
import Notification from "~/screens/Notification";
import AuthSelector from "~/screens/Shared/AuthSelector";
import Location from "~/screens/Location";
import MyMenuStackNav from "./MyMenuStackNav";
import LostDetail from "~/screens/Shared/LostDetail";
import { stackNavScreenOptions } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import UpdateWitnessedList from "~/screens/Shared/UpdateWitnessedList";
import Home from "~/screens/Home";
import PostAnimalInfo from "~/screens/Home/PostAnimalInfo";
import { useAppSelector } from "~/store";

const Stack = createStackNavigator();

const SharedStack = ({ screenName }: { screenName: string }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => <HeaderBackButton />,
        ...stackNavScreenOptions,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      {screenName === "Home" && (
        <Stack.Screen
          name="Home"
          component={Home}
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
        name="PostAnimalInfo"
        component={PostAnimalInfo}
        options={{
          headerShown: !isLoggedIn ? false : true,
          title: "",
        }}
      />
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
        name="UpdateWitnessedList"
        component={UpdateWitnessedList}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default SharedStack;
