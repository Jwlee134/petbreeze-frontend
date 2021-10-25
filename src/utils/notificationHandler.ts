import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { store } from "~/store";
import { navigatorActions } from "~/store/navigator";
import { storageActions } from "~/store/storage";

export default (
  message: FirebaseMessagingTypes.RemoteMessage,
  navigation: any,
) => {
  if (message.notification?.title?.includes("안심존을 벗어났어요")) {
    store.dispatch(
      storageActions.setWalk({
        selectedDeviceId: [1],
      }),
    );
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "WalkMap",
      }),
    );
  }
  if (message.notification?.title?.includes("산책을 끝냈어요")) {
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "BottomTabNav",
        initialBottomTabNavRouteName: "WalkTab",
        initialWalkTopTabNavRouteName: "WalkRecord",
      }),
    );
    store.dispatch(
      navigatorActions.setInitialWalkRecordParams({
        id: 1,
        date: new Date(message?.sentTime || "").toISOString(),
      }),
    );
  }
  if (message.notification?.title?.includes("Test")) {
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "DeviceAlert",
      }),
    );
  }
  navigation.replace("LoggedInNav");
};
