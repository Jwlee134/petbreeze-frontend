import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "~/store/user";
import styled from "styled-components/native";
import AuthButton from "~/components/common/AuthButton";
import useFocusEvent from "~/hooks/useFocusEvent";
import { kakaoLoginAPI } from "~/api/oauth";

import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AuthText = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-bottom: 54px;
`;

const AuthSelector = () => {
  const dispatch = useDispatch();
  useFocusEvent();

  const handleKakaoLogin = async () => {
    let token: KakaoOAuthToken | null = await login();
    const { data } = await kakaoLoginAPI(token.accessToken);
    dispatch(userActions.login(data.key));
    token = null;
  };

  return (
    <Container>
      <AuthText>로그인 후 사용하실 수{"\n"} 있습니다.</AuthText>
      <AuthButton
        type="kakao"
        onPress={handleKakaoLogin}
        style={{ marginBottom: 8 }}>
        카카오 계정으로 로그인
      </AuthButton>
      <AuthButton type="facebook" onPress={() => {}}>
        페이스북 계정으로 로그인
      </AuthButton>
    </Container>
  );
};

export default AuthSelector;
