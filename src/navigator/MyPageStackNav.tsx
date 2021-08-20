import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CustomHeader from "~/components/navigator/CustomHeader";
import MyPage from "~/screens/MyPage";
import DeviceSettingList from "~/screens/MyPage/DeviceSettingList";

const Stack = createStackNavigator();

const MyPageStackNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyPage"
      component={MyPage}
      options={{
        header: props => <CustomHeader {...props}>마이페이지</CustomHeader>,
      }}
    />
    <Stack.Screen
      name="DeviceSettingList"
      component={DeviceSettingList}
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

export default MyPageStackNav;
