import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import useFocusEvent from "~/hooks/useFocusEvent";
import { AuthSelectorScreenNavigationProp } from "~/types/navigator";

import { useNavigation, useRoute } from "@react-navigation/core";
import palette from "~/styles/palette";

import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { storageActions } from "~/store/storage";

const Container = styled.View`
  flex: 1;
  background-color: ${palette.blue_6e};
`;

const HalfContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const BigText = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: white;
`;

const SmallText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: white;
`;

const BoldText = styled(SmallText)`
  font-weight: bold;
`;

const Auth = () => {
  const navigation = useNavigation<AuthSelectorScreenNavigationProp>();
  const route = useRoute();

  const dispatch = useDispatch();
  useFocusEvent();

  const handleKakaoLogin = async () => {
    try {
      let token: KakaoOAuthToken | null = await login();
      /* const { data } = await kakaoLoginAPI(token.accessToken); */
      dispatch(
        storageActions.login("53d7e7141b87cdb0f1adbf48d007ec5e0a36a12b"),
      );
      /* token = null; */
      if (route.name === "AuthSelector") {
        navigation.replace("Home");
        navigation.navigate("AddDevice");
      }
    } catch (error) {}
  };

  const handleFBLogin = () => {
    LoginManager.logInWithPermissions(["public_profile", "openid"])
      .then(result => {
        AccessToken.getCurrentAccessToken().then(async data => {
          console.log(data?.userID);

          dispatch(storageActions.login("asdf"));
        });
      })
      .catch(() => {});
  };

  return (
    <Container>
      <HalfContainer>
        <BigText>어디개</BigText>
      </HalfContainer>
      <HalfContainer>
        <SmallText>
          시작하면 어디개의{" "}
          <BoldText onPress={() => {}}>서비스 이용약관</BoldText>,{" "}
          <BoldText onPress={() => {}}>개인정보 취급방침</BoldText>,{"\n"}
          <BoldText onPress={() => {}}>위치정보 활용약관</BoldText>에
          동의합니다.
        </SmallText>
      </HalfContainer>
    </Container>
  );
};

export default Auth;
