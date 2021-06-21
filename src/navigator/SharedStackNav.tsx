import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import WitnessedDetail from "~/screens/Shared/WitnessedDetail";
import Notification from "~/screens/Notification";
import AuthSelector from "~/screens/Shared/AuthSelector";
import Walk from "~/screens/Walk";
import MyMenuStackNav from "./MyMenuStackNav";
import LostDetail from "~/screens/Shared/LostDetail";
import { mainTabHeaderStyle } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import UpdateWitnessedList from "~/screens/Shared/UpdateWitnessedList";
import Home from "~/screens/Home";
import PostAnimalInfo from "~/screens/Shared/PostAnimalInfo";
import { useAppSelector } from "~/store";
import Community from "~/screens/Community";
import Map from "~/screens/Shared/Map";

const Stack = createStackNavigator();

const SharedStack = ({ screenName }: { screenName: string }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerBackImage: () => <HeaderBackButton />,
        ...mainTabHeaderStyle,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      {screenName === "Home" && (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "홈",
          }}
        />
      )}
      {screenName === "Walk" && (
        <Stack.Screen
          name="Walk"
          component={Walk}
          options={{ title: "산책" }}
        />
      )}
      {screenName === "Community" && (
        <Stack.Screen
          name="Community"
          component={Community}
          options={{
            title: "실종/목격",
          }}
        />
      )}
      {screenName === "Notification" && (
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: isLoggedIn ? true : false,
            title: "알림",
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
      <Stack.Screen
        name="AuthSelector"
        component={AuthSelector}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="PostAnimalInfo"
        component={PostAnimalInfo}
        options={{ title: "" }}
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
      <Stack.Screen name="Map" component={Map} options={{ title: "" }} />
    </Stack.Navigator>
  );
};

export default SharedStack;
