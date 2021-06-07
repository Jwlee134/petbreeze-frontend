import React from "react";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

const CommentContainer = styled.View<{ isLast: boolean }>`
  width: 100%;
  flex-direction: row;
  padding: 13px 0px;
  ${({ isLast }) =>
    !isLast &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${palette.gray_d5};
    `};
`;

const Image = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${palette.gray_e5};
  margin-right: 15px;
`;

const TextContainer = styled.View`
  flex-shrink: 1;
`;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
`;

const LeftContainer = styled.View`
  flex-direction: row;
`;

const BottomContainer = styled.View`
  margin-top: 10px;
`;

const CommentText = styled.Text``;

const Button = styled.TouchableOpacity`
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  color: ${palette.blue_6e};
`;

const DateText = styled.Text`
  opacity: 0.5;
`;

const Comment = ({ item, isLast }: { item: any; isLast: boolean }) => (
  <CommentContainer isLast={isLast}>
    <Image source={require("~/assets/image/test.jpg")} />
    <TextContainer>
      <TopContainer>
        <LeftContainer>
          <CommentText>{item.name}</CommentText>
          {item.isCreator && (
            <>
              <Button activeOpacity={0.7}>
                <ButtonText>수정</ButtonText>
              </Button>
              <Button activeOpacity={0.7}>
                <ButtonText>삭제</ButtonText>
              </Button>
            </>
          )}
        </LeftContainer>
        <DateText>{item.createdAt}</DateText>
      </TopContainer>
      <BottomContainer>
        <CommentText>{item.content}</CommentText>
      </BottomContainer>
    </TextContainer>
  </CommentContainer>
);

export default Comment;
