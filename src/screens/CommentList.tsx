import React from "react";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Comment from "~/components/community/Comment";
import CategoryTitle from "~/components/common/CategoryTitle";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Input from "~/components/common/Input";
import palette from "~/styles/palette";

const InputContainer = styled.KeyboardAvoidingView``;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${palette.blue_6e};
  width: 44px;
  height: 28px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
`;

const data = [
  {
    name: "코코아빠",
    isCreator: true,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: true,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: true,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: true,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
  {
    name: "코코아빠",
    isCreator: false,
    createdAt: "2021-05-12 23:29",
    content: "보호소 공고글에 올라와있던데 얼른 확인해보세요!",
  },
];

const CommentList = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <SafeAreaContainer hasCustomHeader={false}>
      <ScrollView>
        <CategoryTitle>댓글</CategoryTitle>
        <SidePaddingContainer>
          {data.map((item, index) => (
            <Comment
              key={index}
              item={item}
              isLast={index === data.length - 1}
            />
          ))}
        </SidePaddingContainer>
      </ScrollView>
      <InputContainer
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? top + bottom + 10 : 0}>
        <Input
          style={{ paddingRight: 66, borderRadius: 0 }}
          hasShadow={false}
          isMultiline
          RightIcon={() => (
            <SubmitButton onPress={() => {}} activeOpacity={0.8}>
              <Text>입력</Text>
            </SubmitButton>
          )}
        />
      </InputContainer>
    </SafeAreaContainer>
  );
};

export default CommentList;
