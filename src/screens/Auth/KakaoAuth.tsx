import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { userActions } from "~/store/user";

const Container = styled.TouchableOpacity``;

const KakaoAuth = () => {
  const { currentRouteName } = useAppSelector(state => state.common);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Container
      onPress={() => {
        dispatch(userActions.login("Asdf"));
        navigation.navigate(currentRouteName);
      }}>
      <Text>KakaoAuth</Text>
    </Container>
  );
};

export default KakaoAuth;
