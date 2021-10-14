import React, { useContext } from "react";
import styled, { css } from "styled-components/native";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { login } from "@react-native-seoul/kakao-login";

import KakaoIcon from "~/assets/svg/auth/kakao.svg";
import FbIcon from "~/assets/svg/auth/fb.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "~/types/navigator";

const AuthButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  justify-content: center;
  align-items: center;
  ${({ rpWidth }) => css`
    width: ${rpWidth(60)}px;
    height: ${rpWidth(60)}px;
    border-radius: ${rpWidth(30)}px;
  `}
`;

const SocialLogin = ({ name }: { name: string }) => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { rpWidth } = useContext(DimensionsContext);

  const handleKakaoLogin = async () => {
    try {
      const { accessToken } = await login();
      navigation.replace("Loading", {
        token: accessToken,
        nickname: name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFbLogin = async () => {
    try {
      await LoginManager.logInWithPermissions(["public_profile", "openid"]);
      const data = await AccessToken.getCurrentAccessToken();
      if (data) {
        const token = data.accessToken;
        const id = data.userID;
        navigation.replace("Loading", {
          token,
          userID: id,
          nickname: name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
