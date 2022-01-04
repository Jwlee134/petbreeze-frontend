import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SharedStackNav from "./SharedStackNav";

import { BottomTabNavRouteProp, BottomTabParamList } from "~/types/navigator";
import CustomBottomTabBar from "~/components/navigator/CustomBottomTabBar";
import userApi from "~/api/user";
import useAppState from "~/hooks/useAppState";
import { useDispatch } from "react-redux";
import deviceApi from "~/api/device";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNav = ({
  route: { params: { initialRouteName } = {} },
}: {
  route: BottomTabNavRouteProp;
}) => {
  const appState = useAppState();
  const { data, refetch } = userApi.useGetNumOfNewNotificationsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (appState === "active") {
      refetch();
      dispatch(deviceApi.util.invalidateTags([{ type: "Device", id: "LIST" }]));
    }
  }, [appState]);

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={props => (
        <CustomBottomTabBar
          newNotifExists={data !== undefined && data.count !== 0}
          {...props}
        />
      )}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab">
        {() => <SharedStackNav screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen name="WalkTab">
        {() => <SharedStackNav screenName="Walk" />}
      </Tab.Screen>
      <Tab.Screen name="NotificationTab">
        {() => <SharedStackNav screenName="Notification" />}
      </Tab.Screen>
      <Tab.Screen name="MyPageTab">
        {() => <SharedStackNav screenName="MyPage" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNav;
