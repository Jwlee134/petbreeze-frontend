import api from ".";

interface AuthReturnType {
  user_id: number;
  key: string;
  nickname: string;
}

const auth = api.injectEndpoints({
  endpoints: builder => ({
    facebookLogin: builder.query<AuthReturnType, { token: string; id: string }>(
      {
        query: ({ token, id }) => ({
          url: "/accounts/facebook/login/",
          headers: {
            "access-token": token,
            id,
          },
        }),
      },
    ),
    kakaoLogin: builder.query<AuthReturnType, string>({
      query: token => ({
        url: "/accounts/kakao/login/",
        headers: {
          "access-token": token,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/accounts/logout/",
        method: "POST",
      }),
    }),
    updateNickname: builder.mutation<
      { nickname: string },
      { nickname: string }
    >({
      query: nickname => ({
        url: "/accounts/nickname-modify/",
        method: "PATCH",
        body: { nickname },
      }),
    }),
    withdraw: builder.mutation({
      query: () => ({
        url: "/accounts/withdraw/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyFacebookLoginQuery,
  useLazyKakaoLoginQuery,
  useLogoutMutation,
  useUpdateNicknameMutation,
  useWithdrawMutation,
} = auth;
