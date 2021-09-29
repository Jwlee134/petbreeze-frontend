import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components/native";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { login } from "@react-native-seoul/kakao-login";
import messaging from "@react-native-firebase/messaging";

import KakaoIcon from "~/assets/svg/auth/kakao.svg";
import FbIcon from "~/assets/svg/auth/fb.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useNavigation } from "@react-navigation/core";
import { AuthScreenNavigationProp } from "~/types/navigator";
import authApi from "~/api/auth";

const AuthButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  justify-content: center;
  align-items: center;
  ${({ rpWidth }) => css`
    width: ${rpWidth(60)}px;
    height: ${rpWidth(60)}px;
    border-radius: ${rpWidth(30)}px;
  `}
`;

const SocialLogin = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { rpWidth } = useContext(DimensionsContext);
  const [getFacebookUser, facebookUser] = authApi.useLazyFacebookLoginQuery();
  const [getKakaoUser, kakaoUser] = authApi.useLazyKakaoLoginQuery();

  const handleKakaoLogin = async () => {
    login().then(token => {
      getKakaoUser(token.accessToken);
    });
  };

  useEffect(() => {
    console.log(kakaoUser);
    if (kakaoUser.data) {
      navigation.replace("Loading", {
        data: kakaoUser.data,
      });
    }
    if (kakaoUser.error) {
      console.log("Failed to login");
    }
  }, [kakaoUser]);

  const handleFbLogin = () => {
    LoginManager.logInWithPermissions(["public_profile", "openid"]).then(() => {
      AccessToken.getCurrentAccessToken().then(data => {
        if (data) {
          const token = data.accessToken;
          const id = data.userID;
          getFacebookUser({ token, id });
        }
      });
    });
  };

  useEffect(() => {
    console.log(facebookUser);
    if (facebookUser.data) {
      navigation.replace("Loading", {
        data: facebookUser.data,
      });
    }
    if (facebookUser.error) {
      console.log("Failed to login");
    }
  }, [facebookUser]);

  /*    messaging()
      .getToken()
      .then(token => console.log("FCM Token: ", token));  */

  return (
    <>
      <AuthButton
        onPress={handleKakaoLogin}
        style={{
          backgroundColor: "#f7cf48",
          marginRight: rpWidth(40),
        }}
        rpWidth={rpWidth}>
        <KakaoIcon width={rpWidth(22)} height={rpWidth(22)} />
      </AuthButton>
      <AuthButton
        onPress={handleFbLogin}
        style={{ backgroundColor: "#2850b6" }}
        rpWidth={rpWidth}>
        <FbIcon width={rpWidth(12)} height={rpWidth(24)} />
      </AuthButton>
    </>
  );
};

export default SocialLogin;
