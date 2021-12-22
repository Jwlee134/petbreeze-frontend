import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { noName } from "~/constants";
import { store } from "~/store";
import {
  LoggedInNavScreenNavigationProp,
  StartScreenNavigationProp,
} from "~/types/navigator";

type Navigation = LoggedInNavScreenNavigationProp | StartScreenNavigationProp;

export default (
  message: FirebaseMessagingTypes.RemoteMessage,
  navigation: Navigation,
  isStartScreen = false,
) => {
  const {
    walk: { coords },
  } = store.getState().storage;

  const isStartNavigation = (
    navigation: Navigation,
  ): navigation is StartScreenNavigationProp => isStartScreen;

  if (message.notification?.title?.includes("안심존을 벗어났어요")) {
    if (isStartNavigation(navigation)) {
      if (coords.length) {
        navigation.replace("LoggedInNav", {
          initialRouteName: "WalkMap",
        });
        return;
      }
      navigation.replace("LoggedInNav", {
        initialBottomTabRouteName: "WalkTab",
      });
    } else {
      if (coords.length) return;
      navigation.reset({
        index: 0,
        routes: [
          { name: "BottomTabNav", params: { initialRouteName: "WalkTab" } },
        ],
      });
    }
  }

  if (
    message.notification?.title?.includes("산책을 끝냈어요") &&
    message.data?.deviceID
  ) {
    const params = {
      deviceID: parseInt(message.data.deviceID, 10),
      date: message.sentTime
        ? new Date(message.sentTime).toISOString()
        : new Date().toISOString(),
      avatarUrl: message.data.profileImageURL,
      name: message.data.name,
    };
    if (isStartNavigation(navigation)) {
      navigation.replace("LoggedInNav", {
        ...(coords.length && { initialRouteName: "WalkMap" }),
        initialWalkDetailDayParams: params,
      });
    } else {
      navigation.navigate("WalkDetailDay", params);
    }
  }

  if (message.notification?.title?.includes("배터리")) {
    const battery = message.notification.title.split(" ")[2];
    const params = {
      battery,
      avatarUrl: message.data?.profileImageURL || "",
    };
    if (isStartNavigation(navigation)) {
      navigation.replace("LoggedInNav", {
        ...(coords.length && { initialRouteName: "WalkMap" }),
        initialBatteryAlertParams: params,
      });
    } else {
      navigation.navigate("BatteryAlert", params);
    }
  }
};
