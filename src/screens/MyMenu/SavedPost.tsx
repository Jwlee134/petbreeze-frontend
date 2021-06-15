import React from "react";
import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import NothingToShowContainer from "~/components/common/container/NothingToShowContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

const SavedPost = () => {
  return (
    <NothingToShowContainer>저장한 게시물이 없습니다.</NothingToShowContainer>
  );
};

export default SavedPost;
