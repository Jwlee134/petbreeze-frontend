import React from "react";
import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

const SavedPost = () => {
  return (
    <ScrollView>
      <SidePaddingContainer>
        <Text>SavedPost</Text>
      </SidePaddingContainer>
    </ScrollView>
  );
};

export default SavedPost;
