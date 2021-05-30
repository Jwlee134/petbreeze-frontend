import React from "react";
import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

const MyPost = () => {
  return (
    <ScrollView>
      <SidePaddingContainer>
        <Text>MyPost</Text>
      </SidePaddingContainer>
    </ScrollView>
  );
};

export default MyPost;
