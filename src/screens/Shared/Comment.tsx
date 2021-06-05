import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, ScrollView } from "react-native";
import styled from "styled-components/native";
import CategoryTitle from "~/components/common/CategoryTitle";
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

const Comment = () => {
  const height = useBottomTabBarHeight();

  return (
    <>
      <ScrollView>
        <CategoryTitle>댓글</CategoryTitle>
      </ScrollView>
      <InputContainer
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? height + 11 : undefined
        }>
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
    </>
  );
};

export default Comment;
