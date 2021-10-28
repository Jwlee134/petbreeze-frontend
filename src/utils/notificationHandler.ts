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
  const isStartNavigation = (
    navigation: Navigation,
  ): navigation is StartScreenNavigationProp => isStartScreen;

  if (message.notification?.title?.includes("안심존을 벗어났어요")) {
    const { numOfDevice } = store.getState().storage;
    if (numOfDevice < 2) {
      if (isStartNavigation(navigation)) {
        navigation.replace("LoggedInNav", {
          initialRouteName: "WalkMap",
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "WalkMap" }],
        });
      }
    } else {
      if (isStartNavigation(navigation)) {
        navigation.replace("LoggedInNav", {
          initialBottomTabRouteName: "WalkTab",
        });
      } else {
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
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const params = {
      deviceID: 1,
      date: `${year}-${month}-${date}`,
      avatarUrl: "",
    };
    if (isStartNavigation(navigation)) {
      navigation.replace("LoggedInNav", {
        initialWalkDetailDayParams: params,
      });
    } else {
      navigation.navigate("WalkDetailDay", params);
    }
  }

  if (message.notification?.title?.includes("Test")) {
  }
};
