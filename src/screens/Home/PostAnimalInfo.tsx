import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import useFocusEvent from "~/hooks/useFocusEvent";
import { useAppSelector } from "~/store";
import AuthSelector from "../Auth/AuthSelector";

const Container = styled.View``;

const PostAnimalInfo = () => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const { isLoggedIn } = useAppSelector(state => state.user);
  useFocusEvent();

  if (!isLoggedIn) return <AuthSelector />;
  if (currentHomeTab === "Lost") {
    return (
      <Container>
        <Text>실종 동물 정보</Text>
      </Container>
    );
  }
  if (currentHomeTab === "Witnessed") {
    return (
      <Container>
        <Text>목격 동물 정보</Text>
      </Container>
    );
  }
  return null;
};

export default PostAnimalInfo;
