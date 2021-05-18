import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "~/screens/Home";
import Witnessed from "~/screens/Shared/Witnessed";
import Notification from "~/screens/Notification";
import AuthSelector from "~/screens/Shared/AuthSelector";
import Location from "~/screens/Location";
import { useAppSelector } from "~/store";
import PostAnimalInfo from "~/screens/Home/PostAnimalInfo";
import MyMenuStackNav from "./MyMenuStackNav";
import Lost from "~/screens/Shared/Lost";

const Stack = createStackNavigator();

const SharedStack = ({ screenName }: { screenName: string }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);
  const { currentHomeTab } = useAppSelector(state => state.common);
  return (
    <Stack.Navigator>
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
            headerShown: !isLoggedIn ? false : true,
            headerTitle: "알림",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      )}
      {screenName === "MyMenu" && (
        <Stack.Screen
          name="MyMenu"
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
        name="PostAnimalInfo"
        component={PostAnimalInfo}
        options={{
          headerShown: !isLoggedIn ? false : true,
          headerTitle:
            currentHomeTab === "Lost" ? "실종 게시물 등록" : "목격 게시물 등록",
        }}
      />
    </Stack.Navigator>
  );
};

export default SharedStack;
