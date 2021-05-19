import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";
import AuthButton from "~/components/AuthButton";
import useFocusEvent from "~/hooks/useFocusEvent";

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
  const navigation = useNavigation();
  useFocusEvent();

  return (
    <Container>
      <AuthText>로그인 후 사용하실 수{"\n"} 있습니다.</AuthText>
      <AuthButton
        type="kakao"
        onPress={() => navigation.navigate("KakaoAuth")}
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
