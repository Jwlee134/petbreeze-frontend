import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";

import KakaoIcon from "~/assets/svg/init/auth/kakao.svg";
import FacebookIcon from "~/assets/svg/init/auth/facebook.svg";
import { Linking, TouchableWithoutFeedback } from "react-native";
import Button from "../common/Button";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import palette from "~/styles/palette";
import { storageActions } from "~/store/storage";
import { commonActions } from "~/store/common";
import authApi from "~/api/auth";

import MyText from "../common/MyText";
import { rpHeight, rpWidth, width } from "~/styles";
import SidePaddingContainer from "../common/container/SidePaddingContainer";
import SafeAreaContainer from "../common/container/SafeAreaContainer";

const Container = styled.View`
  flex: 1;
  width: ${width}px;
`;

const HalfContainer = styled.View`
  flex: 1;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  align-items: center;
  padding: ${rpHeight(34)}px 0px;
`;

const Auth = ({
  handlePreRender,
  next,
}: {
  handlePreRender: () => void;
  next: () => void;
}) => {
  const [getFacebookUser, facebookUser] = authApi.useLazyFacebookLoginQuery();
  const [getKakaoUser, kakaoUser] = authApi.useLazyKakaoLoginQuery();

  const dispatch = useDispatch();

  const handleKakaoLogin = async () => {
    dispatch(
      storageActions.login({
        token: "d797d59c9c925e05b17d7678faede53a974370e3",
        nickname: "이재원",
      }),
    );
    next();
    // try {
    //   let token: KakaoOAuthToken | null = await login();
    //   console.log(token);
    //   if (token) getKakaoUser(token.accessToken);
    // } catch (error) {
    //   console.log("카카오 서버 에러: ", error);
    // }
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
      next();
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
      next();
    }
    if (facebookUser.error) {
      console.log("Failed to login");
    }
  }, [facebookUser]);

  useEffect(() => {
    handlePreRender();
    /* messaging()
      .getToken()
      .then(token => console.log("FCM Token: ", token)); */
  }, []);

  return (
    <SafeAreaContainer>
      <SidePaddingContainer style={{ flex: 1 }}>
        <HalfContainer></HalfContainer>
        <HalfContainer style={{ justifyContent: "flex-end" }}>
          <Button
            style={{
              marginBottom: rpHeight(12),
            }}
            backgroundColor={palette.kakao_yellow}
            fontColor="#3E2723"
            RightIcon={() => (
              <KakaoIcon
                width={rpWidth(20)}
                height={rpWidth(20)}
                style={{ marginRight: rpWidth(10) }}
              />
            )}
            onPress={handleKakaoLogin}>
            카카오 계정으로 시작하기
          </Button>
          <Button
            backgroundColor={palette.facebook_blue}
            RightIcon={() => (
              <FacebookIcon
                width={rpWidth(20)}
                height={rpWidth(20)}
                style={{ marginRight: rpWidth(10) }}
              />
            )}
            onPress={handleFBLogin}>
            페이스북 계정으로 시작하기
          </Button>
          <TextContainer>
            <RowContainer>
              <MyText fontSize={12} color="rgba(0, 0, 0, 0.5)">
                시작하면 어디개의{" "}
              </MyText>
              <TouchableWithoutFeedback
                onPress={() =>
                  Linking.openURL("https://petbreeze.co/terms-and-conditions")
                }>
                <MyText
                  fontSize={12}
                  color="rgba(0, 0, 0, 0.5)"
                  fontWeight="medium">
                  서비스 이용약관,{" "}
                </MyText>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  Linking.openURL("https://petbreeze.co/privacy-policy")
                }>
                <MyText
                  fontSize={12}
                  color="rgba(0, 0, 0, 0.5)"
                  fontWeight="medium">
                  개인정보
                </MyText>
              </TouchableWithoutFeedback>
            </RowContainer>
            <RowContainer>
              <TouchableWithoutFeedback
                onPress={() =>
                  Linking.openURL("https://petbreeze.co/privacy-policy")
                }>
                <MyText
                  fontSize={12}
                  color="rgba(0, 0, 0, 0.5)"
                  fontWeight="medium">
                  취급방침,{" "}
                </MyText>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  Linking.openURL("https://petbreeze.co/location-policy")
                }>
                <MyText
                  fontSize={12}
                  color="rgba(0, 0, 0, 0.5)"
                  fontWeight="medium">
                  위치정보 활용약관
                </MyText>
              </TouchableWithoutFeedback>
              <MyText fontSize={12} color="rgba(0, 0, 0, 0.5)">
                에 동의하시게 됩니다.
              </MyText>
            </RowContainer>
          </TextContainer>
        </HalfContainer>
      </SidePaddingContainer>
    </SafeAreaContainer>
  );
};

export default React.memo(Auth);
