import React from "react";
import Notification from "~/screens/sharedStackNav/Notification";
import Home from "~/screens/sharedStackNav/Home";
import WalkTopTabNav from "./WalkTopTabNav";
import CustomHeader from "~/components/navigator/CustomHeader";
import DeviceSetting from "~/screens/sharedStackNav/DeviceSetting";
import MyPage from "~/screens/sharedStackNav/MyPage";
import WalkDetailMonth from "~/screens/sharedStackNav/WalkDetailMonth";
import DeviceManagement from "~/screens/sharedStackNav/DeviceManagement";
import NotificationSetting from "~/screens/sharedStackNav/NotificationSetting";
import UpdateNickname from "~/screens/sharedStackNav/UpdateNickname";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const SharedStackNav = ({ screenName }: { screenName: string }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: { opacity: current.progress },
        }),
      }}>
      {screenName === "Home" && (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      )}
      {screenName === "Walk" && (
        <Stack.Screen
          name="WalkTopTabNav"
          component={WalkTopTabNav}
          options={{ header: () => <CustomHeader title="산책" /> }}
        />
      )}
      {screenName === "Notification" && (
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ header: () => <CustomHeader title="알림" /> }}
        />
      )}
      {screenName === "MyPage" && (
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{ header: () => <CustomHeader title="마이페이지" /> }}
        />
      )}
      <Stack.Screen
        name="WalkDetailMonth"
        component={WalkDetailMonth}
        options={{
          header: ({ navigation }) => (
            <CustomHeader navigation={navigation} title="산책 기록" />
          ),
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{
          header: ({ navigation }) => (
            <CustomHeader navigation={navigation} title="알림 설정" />
          ),
        }}
      />
      <Stack.Screen
        name="DeviceSetting"
        component={DeviceSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeviceManagement"
        component={DeviceManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateNickname"
        component={UpdateNickname}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SharedStackNav;
