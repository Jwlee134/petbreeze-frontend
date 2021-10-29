import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";

import BottomTabNav from "./BottomTabNav";
import WalkMap from "~/screens/loggedInNav/WalkMap";
import CustomHeader from "~/components/navigator/CustomHeader";

import messaging from "@react-native-firebase/messaging";
import Permissions from "~/screens/loggedInNav/Permissions";
import {
  LoggedInNavParamList,
  LoggedInNavRouteProp,
  LoggedInNavScreenNavigationProp,
  WalkDetailDayScreenRouteProp,
} from "~/types/navigator";
import UpdateProfile from "~/screens/loggedInNav/UpdateProfile";
import EmergencyMissingStackNav from "./EmergencyMissingStackNav";
import BleRootStackNav from "./BleRootStackNav";
import UpdateWiFi from "~/screens/loggedInNav/UpdateWiFi";
import DeviceAlert from "~/screens/loggedInNav/DeviceAlert";
import DeleteAccountStackNav from "./DeleteAccountStackNav";
import WalkContextProvider from "~/context/WalkContext";
import CodePush from "react-native-code-push";
import userApi from "~/api/user";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import UserRequestSuccess from "~/screens/loggedInNav/UserRequestSuccess";
import notificationHandler from "~/utils/notificationHandler";
import WalkDetailDay from "~/screens/sharedStackNav/WalkDetailDay";

const Stack = createStackNavigator<LoggedInNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const LoggedInNav = ({
  navigation,
  route,
}: {
  navigation: LoggedInNavScreenNavigationProp;
  route: LoggedInNavRouteProp;
}) => {
  const dispatch = useDispatch();

  const [handleRead] = userApi.useReadNotificationsMutation();

  useEffect(() => {
    if (route.params?.initialWalkDetailDayParams) {
      navigation.navigate(
        "WalkDetailDay",
        route.params.initialWalkDetailDayParams,
      );
    }
  }, [route.params?.initialWalkDetailDayParams]);

  useEffect(() => {
    CodePush.sync({
      checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
      installMode: CodePush.InstallMode.ON_NEXT_RESUME,
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      const isNotificationTab =
        navigation.getState().routes[0].state?.routes[0].state?.index === 2;

      if (isNotificationTab) {
        dispatch(
          userApi.util.invalidateTags([{ type: "Notification", id: "LIST" }]),
        );
      } else {
        dispatch(
          userApi.util.invalidateTags([{ type: "Notification", id: "NEW" }]),
        );
      }

      Toast.show({
        type: "notification",
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
        onPress: async () => {
          notificationHandler(remoteMessage, navigation);
          Toast.hide();
          if (!isNotificationTab && remoteMessage?.data?.messageId) {
            handleRead([parseInt(remoteMessage.data.messageId, 10)]);
          }
        },
      });
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage,
      );

      const isNotificationTab =
        navigation.getState().routes[0].state?.routes[0].state?.index === 2;
      if (!isNotificationTab && remoteMessage?.data?.messageId) {
        handleRead([parseInt(remoteMessage.data.messageId, 10)]);
      }

      notificationHandler(remoteMessage, navigation);
    });

    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={route.params?.initialRouteName}
      screenOptions={{
        cardStyleInterpolator: forFade,
        detachPreviousScreen: false,
      }}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        initialParams={{
          initialRouteName: route.params?.initialBottomTabRouteName,
        }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Permissions"
        component={Permissions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BleRootStackNav"
        component={BleRootStackNav}
        initialParams={{
          initialBleWithHeaderStackNavRouteName:
            route.params?.initialBleWithHeaderStackNavRouteName,
        }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmergencyMissingStackNav"
        component={EmergencyMissingStackNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteAccountStackNav"
        component={DeleteAccountStackNav}
        options={{
          header: props => <CustomHeader {...props}>탈퇴하기</CustomHeader>,
        }}
      />
      <Stack.Screen name="WalkMap" options={{ headerShown: false }}>
        {() => (
          <WalkContextProvider>
            <WalkMap />
          </WalkContextProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UpdateWiFi"
        component={UpdateWiFi}
        options={{
          header: props => <CustomHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          header: props => <CustomHeader {...props}>프로필 수정</CustomHeader>,
        }}
      />
      <Stack.Screen
        name="DeviceAlert"
        component={DeviceAlert}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserRequestSuccess"
        component={UserRequestSuccess}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
};

export default LoggedInNav;
