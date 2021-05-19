import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import AuthSelector from "../Shared/AuthSelector";

const Container = styled.View``;

const PostAnimalInfo = () => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const { isLoggedIn } = useAppSelector(state => state.user);

  if (!isLoggedIn) return <AuthSelector />;
  return (
    <Container>
      {currentHomeTab === "Lost" && <Text>실종 게시물 등록</Text>}
      {currentHomeTab === "Witnessed" && <Text>목격 게시물 등록</Text>}
    </Container>
  );
};

export default PostAnimalInfo;
