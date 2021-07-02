import api from ".";

interface IToken {
  key: string;
  user_id: number;
}

const auth = api.injectEndpoints({
  endpoints: builder => ({
    kakaoLogin: builder.mutation<IToken, string>({
      query: token => ({
        url: `/accounts/kakao/login/?access_token=${token}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useKakaoLoginMutation } = auth;
