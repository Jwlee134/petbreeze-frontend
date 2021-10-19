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
import { useAppSelector } from "~/store";
import WalkDetailDay from "~/screens/sharedStackNav/WalkDetailDay";
import { WalkDetailDayScreenRouteProp } from "~/types/navigator";
import NotificationSetting from "~/screens/sharedStackNav/NotificationSetting";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const SharedStackNav = ({ screenName }: { screenName: string }) => {
  const initialRouteName = useAppSelector(
    state => state.navigator.initialSharedStackNavRouteName,
  );

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ cardStyleInterpolator: forFade }}>
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
        name="WalkDetailDay"
        component={WalkDetailDay}
        options={{
          header: props => (
            <CustomHeader {...props}>
              {`${(props.route as WalkDetailDayScreenRouteProp).params.date
                .split("-")
                .splice(1)
                .join("월 ")}일`}
            </CustomHeader>
          ),
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
    </Stack.Navigator>
  );
};

export default SharedStackNav;
