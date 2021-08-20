import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "~/screens/Notification";
import Home from "~/screens/Home";
import WalkTopTabNav from "./WalkTopTabNav";
import WalkDetail from "~/screens/Shared/WalkDetail";
import CustomHeader from "~/components/navigator/CustomHeader";
import MyPageStackNav from "./MyPageStackNav";
import DeviceSetting from "~/screens/Shared/DeviceSetting";

const Stack = createStackNavigator();

const SharedStack = ({
  screenName,
  initialWalkTab,
}: {
  screenName: string;
  initialWalkTab?: string;
}) => (
  <Stack.Navigator>
    {screenName === "Home" && (
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    )}
    {screenName === "Walk" && (
      <Stack.Screen
        name="WalkTopTabNav"
        initialParams={{
          initialTab: initialWalkTab,
        }}
        component={WalkTopTabNav}
        options={{
          header: props => <CustomHeader {...props}>산책</CustomHeader>,
        }}
      />
    )}
    {screenName === "Notification" && (
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          header: props => <CustomHeader {...props}>알림</CustomHeader>,
        }}
      />
    )}
    {screenName === "MyPage" && (
      <Stack.Screen
        name="MyPageStackNav"
        component={MyPageStackNav}
        options={{
          headerShown: false,
        }}
      />
    )}

    <Stack.Screen
      name="WalkDetail"
      component={WalkDetail}
      options={{
        header: props => (
          <CustomHeader useBackButton {...props}>
            산책기록
          </CustomHeader>
        ),
      }}
    />
    <Stack.Screen
      name="DeviceSetting"
      component={DeviceSetting}
      options={{
        header: props => (
          <CustomHeader useBackButton {...props}>
            기기설정
          </CustomHeader>
        ),
      }}
    />
  </Stack.Navigator>
);

export default SharedStack;
