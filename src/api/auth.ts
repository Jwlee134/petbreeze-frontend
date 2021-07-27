import api from ".";

interface User {
  user_id: number;
  key: string;
  nickname: string;
}

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    facebookLogin: builder.query<User, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: "/accounts/facebook/login/",
        headers: {
          "access-token": token,
          id,
        },
      }),
    }),
    kakaoLogin: builder.query<User, string>({
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
    deleteAccount: builder.mutation({
      query: () => ({
        url: "/accounts/withdraw/",
        method: "POST",
      }),
    }),
  }),
});

export default authApi;
