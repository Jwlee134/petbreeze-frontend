import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { store } from "./store";
import { commonActions } from "./store/common";

PushNotification.createChannel(
  {
    channelId: "saved-post",
    channelName: "저장한 게시물 업데이트",
  },
  created => console.log(`saved-post channel ${created}`),
);

PushNotification.createChannel(
  {
    channelId: "my-post",
    channelName: "작성한 게시물 업데이트",
  },
  created => console.log(`my-post channel ${created}`),
);

PushNotification.createChannel(
  {
    channelId: "missing-report",
    channelName: "내 주위의 실종신고 업데이트",
  },
  created => console.log(`missing-report channel ${created}`),
);

PushNotification.createChannel(
  {
    channelId: "walk-start",
    channelName: "산책을 시작할 때 알림",
  },
  created => console.log(`walk-start channel ${created}`),
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
});
