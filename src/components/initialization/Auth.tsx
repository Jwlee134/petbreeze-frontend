import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { useLazyFacebookLoginQuery, useLazyKakaoLoginQuery } from "~/api/auth";

import KakaoIcon from "~/assets/svg/initialization/kakao.svg";
import FacebookIcon from "~/assets/svg/initialization/facebook.svg";
import { View } from "react-native";
import Button from "../common/Button";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import palette from "~/styles/palette";
import { storageActions } from "~/store/storage";
import { Container } from "./Styles";
import { commonActions } from "~/store/common";

const HalfContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
`;

const BigText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: black;
`;

const SmallText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: black;
`;

const BoldText = styled(SmallText)`
  font-weight: bold;
`;

const Auth = () => {
  const [getFacebookUser, facebookUser] = useLazyFacebookLoginQuery();
  const [getKakaoUser, kakaoUser] = useLazyKakaoLoginQuery();

  const dispatch = useDispatch();

  const handleKakaoLogin = async () => {
    /* dispatch(storageActions.setInitialization("initialization")); */
    dispatch(
      storageActions.login({
        token: "f8a328a8bff0c51a6e6f4423cc54001d3b4050f3",
        nickname: "이재원",
      }),
    );
    dispatch(commonActions.setPage("next"));
    /*  try {
      let token: KakaoOAuthToken | null = await login();
      console.log(token);
      if (token) getKakaoUser(token.accessToken);
    } catch (error) {
      console.log("카카오 서버 에러: ", error);
    } */
  };

  useEffect(() => {
    console.log(kakaoUser);
    if (kakaoUser.data) {
      dispatch(
        storageActions.login({
          token: kakaoUser.data.key,
          nickname: kakaoUser.data.nickname,
        }),
      );
      dispatch(commonActions.setPage("next"));
    }
    if (kakaoUser.error) {
      console.log("Failed to login");
    }
  }, [kakaoUser]);

  const handleFBLogin = () => {
    LoginManager.logInWithPermissions(["public_profile", "openid"])
      .then(result => {
        AccessToken.getCurrentAccessToken().then(data => {
          if (data) {
            const token = data.accessToken;
            const id = data.userID;
            getFacebookUser({ token, id });
          }
        });
      })
      .catch(err => {
        console.log("Facebook server error: ", err);
      });
  };

  useEffect(() => {
    console.log(facebookUser);
    if (facebookUser.data) {
      dispatch(
        storageActions.login({
          token: facebookUser.data.key,
          nickname: facebookUser.data.nickname,
        }),
      );
      dispatch(commonActions.setPage("next"));
    }
    if (facebookUser.error) {
      console.log("Failed to login");
    }
  }, [facebookUser]);

  return (
    <Container>
      <HalfContainer style={{ alignItems: "center" }}>
        <BigText>어디개</BigText>
      </HalfContainer>
      <HalfContainer style={{ justifyContent: "space-between" }}>
        <View />
        <View>
          <Button
            text="카카오 계정으로 시작하기"
            style={{
              backgroundColor: palette.kakao_yellow,
              marginBottom: 12,
            }}
            textColor="black"
            onPress={handleKakaoLogin}
            Icon={() => <KakaoIcon />}
          />
          <Button
            text="페이스북 계정으로 시작하기"
            style={{ backgroundColor: palette.facebook_blue }}
            Icon={() => <FacebookIcon />}
            onPress={handleFBLogin}
          />
        </View>
        <SmallText>
          시작하면 어디개의{" "}
          <BoldText onPress={() => {}}>서비스 이용약관</BoldText>,{" "}
          <BoldText onPress={() => {}}>개인정보 취급방침</BoldText>,{"\n"}
          <BoldText onPress={() => {}}>위치정보 활용약관</BoldText>에 동의하시게
          됩니다.
        </SmallText>
      </HalfContainer>
    </Container>
  );
};

export default Auth;
