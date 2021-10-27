import React from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import Notification from "~/screens/sharedStackNav/Notification";
import Home from "~/screens/sharedStackNav/Home";
import WalkTopTabNav from "./WalkTopTabNav";
import CustomHeader from "~/components/navigator/CustomHeader";
import DeviceSetting from "~/screens/sharedStackNav/DeviceSetting";
import MyPage from "~/screens/sharedStackNav/MyPage";
import WalkDetailMonth from "~/screens/sharedStackNav/WalkDetailMonth";
import DeviceSettingList from "~/screens/sharedStackNav/DeviceSettingList";
import NotificationSetting from "~/screens/sharedStackNav/NotificationSetting";
import UpdateNickname from "~/screens/sharedStackNav/UpdateNickname";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const SharedStackNav = ({ screenName }: { screenName: string }) => {
  return (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: forFade }}>
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
          component={WalkTopTabNav}
          options={{
            header: props => (
              <CustomHeader disableBackButton {...props}>
                산책
              </CustomHeader>
            ),
          }}
        />
      )}
      {screenName === "Notification" && (
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            header: props => (
              <CustomHeader disableBackButton {...props}>
                알림
              </CustomHeader>
            ),
          }}
        />
      )}
      {screenName === "MyPage" && (
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{
            header: props => (
              <CustomHeader disableBackButton {...props}>
                마이페이지
              </CustomHeader>
            ),
          }}
        />
      )}
      <Stack.Screen
        name="WalkDetailMonth"
        component={WalkDetailMonth}
        options={{
          header: props => <CustomHeader {...props}>산책기록</CustomHeader>,
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{
          header: props => <CustomHeader {...props}>알림설정</CustomHeader>,
        }}
      />
      <Stack.Screen
        name="DeviceSetting"
        component={DeviceSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeviceSettingList"
        component={DeviceSettingList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateNickname"
        component={UpdateNickname}
        options={{
          header: props => <CustomHeader {...props}>이름변경</CustomHeader>,
        }}
      />
    </Stack.Navigator>
  );
};

export default SharedStackNav;
