import React from "react";
import styled from "styled-components/native";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { login } from "@react-native-seoul/kakao-login";

import KakaoIcon from "~/assets/svg/auth/kakao.svg";
import FbIcon from "~/assets/svg/auth/fb.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "~/types/navigator";

const AuthButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const SocialLogin = ({ name }: { name: string }) => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

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
    LoginManager.logOut();
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
          marginRight: 40,
        }}>
        <KakaoIcon width={22} height={22} />
      </AuthButton>
      <AuthButton
        onPress={handleFbLogin}
        style={{ backgroundColor: "#2850b6" }}>
        <FbIcon width={12} height={24} />
      </AuthButton>
    </>
  );
};

export default SocialLogin;
