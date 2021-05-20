import React from "react";
import styled from "styled-components/native";
import CategoryTitle from "~/components/CategoryTitle";
import Input from "~/components/Input";
import { useAppSelector } from "~/store";
import AuthSelector from "../Shared/AuthSelector";

const Container = styled.ScrollView``;

const InputContainer = styled.View`
  padding: 0px 25px;
`;

const PostAnimalInfo = () => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const { isLoggedIn } = useAppSelector(state => state.user);

  if (!isLoggedIn) return <AuthSelector />;
  return (
    <Container>
      <CategoryTitle>
        {currentHomeTab === "Lost" ? "실종" : "목격"} 동물 정보
      </CategoryTitle>
      <CategoryTitle>
        {currentHomeTab === "Lost" ? "보호자" : "목격자"} 연락처
      </CategoryTitle>
      <InputContainer>
        <Input placeholder="이름*" />
      </InputContainer>
    </Container>
  );
};

export default PostAnimalInfo;
