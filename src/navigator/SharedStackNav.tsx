import React from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import Notification from "~/screens/bottomTabNav/Notification";
import Home from "~/screens/bottomTabNav/Home";
import WalkTopTabNav from "./WalkTopTabNav";
import CustomHeader from "~/components/navigator/CustomHeader";
import DeviceSetting from "~/screens/sharedStackNav/DeviceSetting";
import MyPage from "~/screens/bottomTabNav/MyPage";
import WalkDetail from "~/screens/sharedStackNav/WalkDetail";
import DeviceSettingList from "~/screens/sharedStackNav/DeviceSettingList";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const SharedStack = ({
  screenName,
  initialWalkTab,
}: {
  screenName: string;
  initialWalkTab?: string;
}) => (
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
        initialParams={{
          initialTab: initialWalkTab,
        }}
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
      name="WalkDetail"
      component={WalkDetail}
      options={{
        header: props => <CustomHeader {...props}>산책기록</CustomHeader>,
      }}
    />
    <Stack.Screen
      name="DeviceSetting"
      component={DeviceSetting}
      options={{
        header: props => <CustomHeader {...props}>기기설정</CustomHeader>,
      }}
    />
    <Stack.Screen
      name="DeviceSettingList"
      component={DeviceSettingList}
      options={{
        header: props => <CustomHeader {...props}>기기설정</CustomHeader>,
      }}
    />
  </Stack.Navigator>
);

export default SharedStack;
