import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
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
    numOfDevice,
    walk: { coords },
  } = store.getState().storage;

  const isStartNavigation = (
    navigation: Navigation,
  ): navigation is StartScreenNavigationProp => isStartScreen;

  if (message.notification?.title?.includes("안심존을 벗어났어요")) {
    if (numOfDevice < 2) {
      if (isStartNavigation(navigation)) {
        navigation.replace("LoggedInNav", {
          initialRouteName: "WalkMap",
        });
      } else {
        if (coords.length) return;
        navigation.reset({
          index: 0,
          routes: [{ name: "WalkMap" }],
        });
      }
    } else {
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
  }

  if (
    message.notification?.title?.includes("산책을 끝냈어요") &&
    message.data?.deviceID &&
    message.data?.profileImageURL
  ) {
    let year: number;
    let month: number;
    let date: number;
    if (message?.sentTime) {
      year = new Date(message.sentTime).getFullYear();
      month = new Date(message.sentTime).getMonth() + 1;
      date = new Date(message.sentTime).getDate();
    } else {
      year = new Date().getFullYear();
      month = new Date().getMonth() + 1;
      date = new Date().getDate();
    }
    const params = {
      deviceID: parseInt(message.data.deviceID, 10),
      date: `${year}-${month}-${date}`,
      avatarUrl: message.data.profileImageURL,
    };
    if (isStartNavigation(navigation)) {
      if (coords.length) {
        navigation.replace("LoggedInNav", {
          initialRouteName: "WalkMap",
        });
      } else {
        navigation.replace("LoggedInNav", {
          initialWalkDetailDayParams: params,
        });
      }
    } else {
      navigation.navigate("WalkDetailDay", params);
    }
  }

  if (message.notification?.title?.includes("Test")) {
  }
};
