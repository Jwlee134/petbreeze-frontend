import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import palette from "~/styles/palette";
import SharedStackNav from "./SharedStackNav";

import Home from "~/assets/svg/tab/home.svg";
import HomeOutline from "~/assets/svg/tab/home-outline.svg";
import Footprint from "~/assets/svg/tab/footprint.svg";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import Bell from "~/assets/svg/tab/bell.svg";
import BellOutline from "~/assets/svg/tab/bell-outline.svg";
import User from "~/assets/svg/tab/user.svg";
import UserOutline from "~/assets/svg/tab/user-outline.svg";
import WalkStackNav from "./WalkStackNav";
import { isAndroid } from "~/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState("HomeTab");
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenUrl = ({ url }: { url: string }) => {
    if (url === "petbreeze://walk/map") {
      // @ts-ignore
      navigation.navigate("WalkMap");
    }
  };

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        if (url === "petbreeze://walk/map") {
          setInitialRoute("WalkTab");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    Linking.addEventListener("url", handleOpenUrl);
    return () => {
      Linking.removeEventListener("url", handleOpenUrl);
    };
  }, []);

  if (isLoading) return null;

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        tabBarActiveTintColor: palette.blue_6e,
        tabBarInactiveTintColor: "#808080",
        tabBarLabelStyle: {
          marginBottom: 6,
        },
        tabBarStyle: {
          height: isAndroid ? 56 : 56 + bottom,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarIcon: ({ focused }) => (focused ? <Home /> : <HomeOutline />),
          tabBarLabel: "홈",
        }}>
        {() => <SharedStackNav screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen
        name="WalkTab"
        component={WalkStackNav}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Footprint /> : <FootprintOutline />,
          tabBarLabel: "산책",
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        options={{
          tabBarIcon: ({ focused }) => (focused ? <Bell /> : <BellOutline />),
          tabBarLabel: "알림",
        }}>
        {() => <SharedStackNav screenName="Notification" />}
      </Tab.Screen>
      <Tab.Screen
        name="MyPageTab"
        options={{
          tabBarIcon: ({ focused }) => (focused ? <User /> : <UserOutline />),
          tabBarLabel: "마이페이지",
        }}>
        {() => <SharedStackNav screenName="MyPage" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNav;
