import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { store } from "~/store";
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
    navigation.replace("WalkMap");
  }
  if (
    message.notification?.title?.includes("산책을 끝냈어요") &&
    message.data?.deviceID &&
    message.data?.profileImageURL &&
    message?.sentTime
  ) {
    navigation.navigate("WalkDetailDay", {
      deviceID: message.data.deviceID,
      date: new Date(message.sentTime).toISOString(),
      avatar: message.data.profileImageURL,
    });
  }
  if (message.notification?.title?.includes("Test")) {
    navigation.navigate("DeviceAlert");
  }
};
