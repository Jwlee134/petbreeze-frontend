import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import BottomTabNav from "./BottomTabNav";
import WalkMap from "~/screens/loggedInNav/WalkMap";
import messaging from "@react-native-firebase/messaging";
import {
  LoggedInNavParamList,
  LoggedInNavRouteProp,
  LoggedInNavScreenNavigationProp,
} from "~/types/navigator";
import UpdateProfile from "~/screens/loggedInNav/UpdateProfile";
import EmergencyMissingStackNav from "./EmergencyMissingStackNav";
import BleRootStackNav from "./BleRootStackNav";
import UpdateWiFi from "~/screens/loggedInNav/UpdateWiFi";
import BatteryAlert from "~/screens/loggedInNav/BatteryAlert";
import DeleteAccountStackNav from "./DeleteAccountStackNav";
import WalkContextProvider from "~/context/WalkContext";
import CodePush from "react-native-code-push";
import userApi from "~/api/user";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import UserRequestSuccess from "~/screens/loggedInNav/UserRequestSuccess";
import notificationHandler from "~/utils/notificationHandler";
import WalkDetailDay from "~/screens/loggedInNav/WalkDetailDay";
import UpdateArea from "~/screens/loggedInNav/UpdateArea";
import Policy from "~/screens/loggedInNav/Policy";
import Permission from "~/screens/loggedInNav/Permission";
import InvitationCodeCheck from "~/screens/loggedInNav/InvitationCodeCheck";
import NewDeviceCheck from "~/screens/loggedInNav/NewDeviceCheck";

const Stack = createStackNavigator<LoggedInNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const LoggedInNav = ({
  navigation,
  route: {
    params: {
      initialRouteName,
      initialBleWithHeaderStackNavRouteName,
      initialBottomTabRouteName,
      initialWalkDetailDayParams,
      initialBatteryAlertParams,
    } = {},
  },
}: {
  navigation: LoggedInNavScreenNavigationProp;
  route: LoggedInNavRouteProp;
}) => {
  const dispatch = useDispatch();

  const [handleRead] = userApi.useReadNotificationsMutation();

  useEffect(() => {
    if (initialWalkDetailDayParams) {
      navigation.navigate("WalkDetailDay", initialWalkDetailDayParams);
    }
    if (initialBatteryAlertParams) {
      navigation.navigate("BatteryAlert", initialBatteryAlertParams);
    }
  }, [initialWalkDetailDayParams, initialBatteryAlertParams]);

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
      initialRouteName={initialRouteName}
      screenOptions={{
        cardStyleInterpolator: forFade,
        detachPreviousScreen: false,
        headerShown: false,
      }}>
      <Stack.Screen name="Policy" component={Policy} />
      <Stack.Screen name="Permission" component={Permission} />
      <Stack.Screen
        name="InvitationCodeCheck"
        component={InvitationCodeCheck}
      />
      <Stack.Screen name="NewDeviceCheck" component={NewDeviceCheck} />
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        initialParams={{
          initialRouteName: initialBottomTabRouteName,
        }}
      />
      <Stack.Screen
        name="BleRootStackNav"
        component={BleRootStackNav}
        initialParams={{
          initialBleWithHeaderStackNavRouteName,
        }}
      />
      <Stack.Screen
        name="EmergencyMissingStackNav"
        component={EmergencyMissingStackNav}
      />
      <Stack.Screen
        name="DeleteAccountStackNav"
        component={DeleteAccountStackNav}
      />
      <Stack.Screen name="WalkMap">
        {() => (
          <WalkContextProvider>
            <WalkMap />
          </WalkContextProvider>
        )}
      </Stack.Screen>
      <Stack.Screen name="UpdateWiFi" component={UpdateWiFi} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="UpdateArea" component={UpdateArea} />
      <Stack.Screen name="BatteryAlert" component={BatteryAlert} />
      <Stack.Screen name="UserRequestSuccess" component={UserRequestSuccess} />
      <Stack.Screen name="WalkDetailDay" component={WalkDetailDay} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
