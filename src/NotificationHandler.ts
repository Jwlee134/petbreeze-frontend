import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { store } from "./store";
import { commonActions } from "./store/common";

PushNotification.createChannel(
  {
    channelId: "safety-zone",
    channelName: "안심존을 벗어나면 알림",
  },
  created => console.log(`safety-zone channel ${created}`),
);

PushNotification.getChannels(channels => {
  console.log(channels);
});

PushNotification.configure({
  onRegister: token => {
    console.log("TOKEN: ", token);
  },
  onNotification: notification => {
    if (!notification.userInteraction) return;

    let title: string;

    if (notification.foreground) {
      title = notification.title;
    } else {
      title = notification.data["gcm.n.analytics_data"]["google.c.a.c_l"];
    }

    store.dispatch(commonActions.setNotification(title));

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  requestPermissions: false,
});
