import { api } from ".";

interface IToken {
  key: string;
  user_id: number;
}

export const kakaoLoginAPI = (token: string) =>
  api.get<IToken>(`/accounts/kakao/login/?access_token=${token}`);
