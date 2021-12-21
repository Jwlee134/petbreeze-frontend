import React, { useEffect } from "react";
import BottomTabNav from "./BottomTabNav";
import WalkMap from "~/screens/loggedInNav/WalkMap";
import messaging from "@react-native-firebase/messaging";
import {
  LoggedInNavParamList,
  LoggedInNavRouteProp,
  LoggedInNavScreenNavigationProp,
} from "~/types/navigator";
import UpdateProfile from "~/screens/loggedInNav/UpdateProfile";
import MissingReportStackNav from "./MissingReportStackNav";
import BleRootStackNav from "./BleRootStackNav";
import UpdateWiFi from "~/screens/loggedInNav/UpdateWiFi";
import BatteryAlert from "~/screens/loggedInNav/BatteryAlert";
import DeleteAccountStackNav from "./DeleteAccountStackNav";
import WalkContextProvider from "~/context/WalkContext";
import CodePush from "react-native-code-push";
import userApi from "~/api/user";
import Toast from "react-native-toast-message";
import Success from "~/screens/loggedInNav/Success";
import notificationHandler from "~/utils/notificationHandler";
import WalkDetailDay from "~/screens/loggedInNav/WalkDetailDay";
import UpdateArea from "~/screens/loggedInNav/UpdateArea";
import Policy from "~/screens/loggedInNav/Policy";
import Permission from "~/screens/loggedInNav/Permission";
import AddDevice from "~/screens/loggedInNav/AddDevice";
import InvitationCodeForm from "~/screens/loggedInNav/InvitationCodeForm";
import Welcome from "~/screens/loggedInNav/Welcome";
import { secureItems } from "~/constants";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import { useAppSelector } from "~/store";
import { createStackNavigator } from "@react-navigation/stack";
import MissingReportInfo from "~/screens/loggedInNav/MissingReportInfo";

const Stack = createStackNavigator<LoggedInNavParamList>();

const LoggedInNav = ({
  navigation,
  route: {
    params: {
      initialRouteName,
      initialBleWithHeaderStackNavRouteName,
      initialBottomTabRouteName,
      initialWalkDetailDayParams,
      initialBatteryAlertParams,
      initialPermissionParams,
    } = {},
  },
}: {
  navigation: LoggedInNavScreenNavigationProp;
  route: LoggedInNavRouteProp;
}) => {
  const dispatch = useDispatch();
  const isTokenInvalid = useAppSelector(state => state.common.isTokenInvalid);

  const [handleRead] = userApi.useReadNotificationsMutation();

  useEffect(() => {
    if (isTokenInvalid) {
      (async () => {
        await Promise.all(
          Object.values(secureItems).map(item =>
            SecureStore.deleteItemAsync(item),
          ),
        );
        await messaging().deleteToken();
        navigation.reset({ index: 0, routes: [{ name: "Start" }] });
        dispatch(commonActions.setIsTokenInvalid(false));
      })();
    }
  }, [isTokenInvalid]);

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
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: { opacity: current.progress },
        }),
      }}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        initialParams={{
          initialRouteName: initialBottomTabRouteName,
        }}
      />
      <Stack.Screen name="Policy" component={Policy} />
      <Stack.Screen
        name="Permission"
        component={Permission}
        initialParams={initialPermissionParams}
      />
      <Stack.Screen name="AddDevice" component={AddDevice} />
      <Stack.Screen name="InvitationCodeForm" component={InvitationCodeForm} />
      <Stack.Screen
        name="BleRootStackNav"
        component={BleRootStackNav}
        initialParams={{
          initialBleWithHeaderStackNavRouteName,
        }}
      />
      <Stack.Screen
        name="MissingReportStackNav"
        component={MissingReportStackNav}
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
      <Stack.Screen name="MissingReportInfo" component={MissingReportInfo} />
      <Stack.Screen name="UpdateWiFi" component={UpdateWiFi} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="UpdateArea" component={UpdateArea} />
      <Stack.Screen name="BatteryAlert" component={BatteryAlert} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="WalkDetailDay" component={WalkDetailDay} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
