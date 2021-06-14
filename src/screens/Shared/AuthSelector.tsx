import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "~/store/user";
import styled from "styled-components/native";
import AuthButton from "~/components/common/button/AuthButton";
import useFocusEvent from "~/hooks/useFocusEvent";
import { kakaoLoginAPI } from "~/api/oauth";
import { AuthSelectorScreenNavigationProp } from "~/types/navigator";

import { useNavigation, useRoute } from "@react-navigation/core";
import { useAppSelector } from "~/store";
import { ActivityIndicator } from "react-native";
import palette from "~/styles/palette";

import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

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
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<AuthSelectorScreenNavigationProp>();
  const route = useRoute();

  const dispatch = useDispatch();
  useFocusEvent();

  const handleKakaoLogin = async () => {
    try {
      setLoading(true);
      let token: KakaoOAuthToken | null = await login();
      /* const { data } = await kakaoLoginAPI(token.accessToken); */
      dispatch(userActions.login("asdf"));
      /* token = null; */
      if (route.name === "AuthSelector") {
        navigation.replace("Home");
        navigation.navigate("AddDevice");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFBLogin = () => {
    setLoading(true);
    LoginManager.logInWithPermissions(["public_profile", "openid"])
      .then(result => {
        if (result.isCancelled) return setLoading(false);

        AccessToken.getCurrentAccessToken().then(async data => {
          console.log(data?.userID);

          dispatch(userActions.login("asdf"));
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading)
    return (
      <Container>
        <ActivityIndicator size="large" color={palette.blue_6e} />
      </Container>
    );

  return (
    <Container>
      <AuthText>로그인 후 사용하실 수{"\n"} 있습니다.</AuthText>
      <AuthButton
        type="kakao"
        onPress={handleKakaoLogin}
        style={{ marginBottom: 8 }}>
        카카오 계정으로 로그인
      </AuthButton>
      <AuthButton type="facebook" onPress={handleFBLogin}>
        페이스북 계정으로 로그인
      </AuthButton>
    </Container>
  );
};

export default AuthSelector;
