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

export interface NotificationSettings {
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
        url: "/account/login/facebook/",
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
        url: "/account/login/kakao/",
        method: "POST",
        headers: {
          "access-token": accessToken,
          "firebase-registration-token": firebaseToken,
        },
      }),
    }),

    logout: builder.mutation<void, string>({
      query: firebaseToken => ({
        url: "/account/logout/",
        method: "POST",
        headers: {
          "firebase-registration-token": firebaseToken,
        },
      }),
    }),

    getNotifications: builder.query<Notification[], void>({
      query: () => "/account/push-noti/",
      providesTags: result => providesList(result, "Notification"),
    }),

    readNotifications: builder.mutation<void, number[]>({
      query: ids => ({
        url: "/account/push-noti/",
        method: "POST",
        body: {
          message_ids: ids,
        },
      }),
    }),

    getNumOfNewNotifications: builder.query<{ count: number }, void>({
      query: () => "/account/push-noti/check-new/",
      providesTags: () => [{ type: "Notification", id: "NEW" }],
    }),

    getNofiticationSettings: builder.query<NotificationSettings, string>({
      query: firebaseToken => ({
        url: "/account/setting/push-noti/",
        headers: {
          "firebase-registration-token": firebaseToken,
        },
      }),
    }),

    updateNotificationSettings: builder.mutation<
      NotificationSettings,
      {
        firebaseToken: string;
        body: NotificationSettings;
      }
    >({
      query: ({ firebaseToken, body }) => ({
        url: "/account/setting/push-noti/",
        method: "PUT",
        headers: {
          "firebase-registration-token": firebaseToken,
        },
        body,
      }),
      onQueryStarted: async (
        { firebaseToken, body },
        { dispatch, queryFulfilled },
      ) => {
        const putResult = dispatch(
          userApi.util.updateQueryData(
            "getNofiticationSettings",
            firebaseToken,
            draft => {
              Object.assign(draft, body);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();
        }
      },
    }),

    getNickname: builder.query<{ nickname: string }, void>({
      query: () => "/account/setting/nickname/",
    }),

    updateNickname: builder.mutation<{ nickname: string }, string>({
      query: nickname => ({
        url: "/account/setting/nickname/",
        method: "PUT",
        body: { nickname },
      }),
      onQueryStarted: async (nickname, { dispatch, queryFulfilled }) => {
        const putResult = dispatch(
          userApi.util.updateQueryData("getNickname", undefined, draft => {
            draft.nickname = nickname;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();
        }
      },
    }),

    deleteAccount: builder.mutation<void, number>({
      query: reason => ({
        url: "/account/withdraw/",
        method: "POST",
        body: {
          with_draw_reason: reason,
        },
      }),
    }),
  }),
});

export default userApi;
