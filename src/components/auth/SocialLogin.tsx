import React, { useState } from "react";
import styled from "styled-components/native";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { login } from "@react-native-seoul/kakao-login";
import KakaoIcon from "~/assets/svg/auth/kakao.svg";
import FbIcon from "~/assets/svg/auth/fb.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "~/types/navigator";
import LoadingIndicator from "../lottie/LoadingIndicator";
import userApi from "~/api/user";
import messaging from "@react-native-firebase/messaging";
import * as SecureStore from "expo-secure-store";
import { secureItems } from "~/constants";
import { useAppSelector } from "~/store";

const AuthButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const SocialLogin = ({ name }: { name: string }) => {
  const isPermissionAllowed = useAppSelector(
    state => state.storage.init.isPermissionAllowed,
  );
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [kakaoLoading, setKakaoLoading] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);

  const [postFacebookUser] = userApi.useFacebookLoginMutation();
  const [postKakaoUser] = userApi.useKakaoLoginMutation();
  const [updateNickname] = userApi.useUpdateNicknameMutation();

  const saveTokens = async (
    token: string,
    firebaseToken: string,
    userID: number,
  ) => {
    await Promise.all([
      SecureStore.setItemAsync(secureItems.token, token),
      SecureStore.setItemAsync(secureItems.firebaseToken, firebaseToken),
      SecureStore.setItemAsync(secureItems.userID, userID.toString()),
    ]);
  };

  const signUp = async (token: string, name: string, id?: string) => {
    try {
      const firebaseToken = await messaging().getToken();
      let statusCode = 0;
      if (id) {
        setFbLoading(true);
        const { status, data } = await postFacebookUser({
          accessToken: token,
          firebaseToken,
          userID: id,
        }).unwrap();
        statusCode = status;
        console.log(data.key, firebaseToken, data.user_id);
        await saveTokens(data.key, firebaseToken, data.user_id);
      } else {
        setKakaoLoading(true);
        const {
          status,
          data: { key, user_id },
        } = await postKakaoUser({
          accessToken: token,
          firebaseToken,
        }).unwrap();
        statusCode = status;
        console.log(key, firebaseToken, user_id);
        await saveTokens(key, firebaseToken, user_id);
      }
      await updateNickname(name).unwrap();
      if (fbLoading) setFbLoading(false);
      if (kakaoLoading) setKakaoLoading(false);
      if (statusCode === 201) {
        // 회원가입
        navigation.replace("LoggedInNav", { initialRouteName: "Policy" });
      } else {
        // 로그인
        navigation.replace("LoggedInNav", {
          initialRouteName: isPermissionAllowed ? "BottomTabNav" : "Permission",
          initialPermissionParams: isPermissionAllowed
            ? undefined
            : { isLogIn: true },
        });
      }
    } catch (error) {
      if (fbLoading) setFbLoading(false);
      if (kakaoLoading) setKakaoLoading(false);
      console.log(error);
    }
  };

  const handleKakaoLogin = async () => {
    if (kakaoLoading) return;
    try {
      const { accessToken } = await login();
      signUp(accessToken, name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFbLogin = async () => {
    if (fbLoading) return;
    LoginManager.logOut();
    try {
      await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
        "user_gender",
        "user_birthday",
      ]);
      const data = await AccessToken.getCurrentAccessToken();
      if (data) {
        const token = data.accessToken;
        const id = data.userID;
        signUp(token, name, id);
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
        {kakaoLoading ? <LoadingIndicator white size={60} /> : <KakaoIcon />}
      </AuthButton>
      <AuthButton
        onPress={handleFbLogin}
        style={{ backgroundColor: "#2850b6" }}>
        {fbLoading ? <LoadingIndicator white size={60} /> : <FbIcon />}
      </AuthButton>
    </>
  );
};

export default SocialLogin;
