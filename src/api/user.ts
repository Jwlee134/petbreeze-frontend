import api, { providesList } from ".";

interface LoginRes {
  user_id: number;
  key: string;
}

interface LoginArgs {
  accessToken: string;
  firebaseToken: string;
}

export interface Notification {
  related_device_id: number;
  is_new: boolean;
  body: string;
  created_at: string;
  id: number;
}

interface NotificationSettings {
  low_battery_notification: boolean;
  exit_notification: boolean;
  start_walk_notification: boolean;
  stop_walk_notification: boolean;
  disconnect_notification: boolean;
}

const userApi = api.injectEndpoints({
  endpoints: builder => ({
    facebookLogin: builder.mutation<LoginRes, LoginArgs & { userID: string }>({
      query: ({ accessToken, firebaseToken, userID }) => ({
        url: "/accounts/login/facebook/",
        method: "POST",
        headers: {
          "access-token": accessToken,
          "firebase-registration-token": firebaseToken,
          uid: userID,
        },
      }),
    }),

    kakaoLogin: builder.mutation<LoginRes, LoginArgs>({
      query: ({ accessToken, firebaseToken }) => ({
        url: "/accounts/login/kakao/",
        method: "POST",
        headers: {
          "access-token": accessToken,
          "firebase-registration-token": firebaseToken,
        },
      }),
    }),

    logout: builder.mutation<void, string>({
      query: firebaseToken => ({
        url: "/accounts/logout/",
        method: "POST",
        headers: {
          "firebase-registration-token": firebaseToken,
        },
      }),
    }),

    getNotifications: builder.query<Notification[], void>({
      query: () => "/accounts/push-noti/",
      providesTags: result => providesList(result, "Notification"),
    }),

    readNotifications: builder.mutation<void, number[]>({
      query: ids => ({
        url: "/accounts/push-noti/",
        method: "POST",
        body: {
          message_ids: ids,
        },
      }),
    }),

    getNumOfNewNotifications: builder.query<number, void>({
      query: () => "/accounts/push-noti/check-new/",
      providesTags: () => [{ type: "Notification", id: "NEW" }],
    }),

    getNofiticationSettings: builder.query<NotificationSettings, string>({
      query: firebaseToken => ({
        url: "/accounts/setting/push-noti/",
        headers: {
          "firebase-registration-token": firebaseToken,
        },
      }),
    }),

    updateNotificationSettings: builder.mutation<NotificationSettings, string>({
      query: firebaseToken => ({
        url: "/accounts/setting/push-noti/",
        method: "PUT",
        headers: {
          "firebase-registration-token": firebaseToken,
        },
      }),
    }),

    getNickname: builder.query<{ nickname: string }, void>({
      query: () => "/accounts/setting/nickname/",
    }),

    updateNickname: builder.mutation<{ nickname: string }, string>({
      query: nickname => ({
        url: "/accounts/setting/nickname/",
        method: "PUT",
        body: { nickname },
      }),
    }),

    deleteAccount: builder.mutation<void, number>({
      query: reason => ({
        url: "/accounts/withdraw/",
        method: "POST",
        body: {
          with_draw_reason: reason,
        },
      }),
    }),
  }),
});

export default userApi;
