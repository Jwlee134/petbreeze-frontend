import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import AuthButton from "~/components/common/button/AuthButton";
import { useAppSelector } from "~/store";
import { userActions } from "~/store/user";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 36px;
  margin-top: 67px;
`;

const KakaoAuth = () => {
  const { currentRouteName } = useAppSelector(state => state.common);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Title>로그인</Title>
      </Container>
      <Container>
        <AuthButton
          type="kakao"
          onPress={() => {
            dispatch(userActions.login("asdf"));
            console.log(currentRouteName);
            navigation.navigate(currentRouteName);
          }}
          style={{ marginBottom: 8 }}>
          카카오톡으로 간편로그인
        </AuthButton>
        <AuthButton type="kakao" onPress={() => {}}>
          다른 카카오계정으로 로그인
        </AuthButton>
      </Container>
    </>
  );
};

export default KakaoAuth;
