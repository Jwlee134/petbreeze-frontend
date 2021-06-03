import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import CategoryTitle from "~/components/common/CategoryTitle";
import Input from "~/components/common/input/Input";

const Comment = () => (
  <>
    <ScrollView>
      <CategoryTitle>댓글</CategoryTitle>
    </ScrollView>
    <KeyboardAvoidingView>
      <Input />
    </KeyboardAvoidingView>
  </>
);

export default Comment;
