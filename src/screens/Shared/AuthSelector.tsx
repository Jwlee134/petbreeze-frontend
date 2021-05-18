import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import useFocusEvent from "~/hooks/useFocusEvent";

const Container = styled.View``;

const AuthSelector = () => {
  const navigation = useNavigation();
  useFocusEvent();

  return (
    <Container>
      <Text>로그인 후 사용하실 수 있습니다.</Text>
      <TouchableOpacity onPress={() => navigation.navigate("KakaoAuth")}>
        <Text>카카오 계정으로 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>페이스북 계정으로 로그인</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default AuthSelector;
