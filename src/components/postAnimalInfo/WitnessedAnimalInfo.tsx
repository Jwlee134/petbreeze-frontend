import React from "react";
import styled from "styled-components/native";

import UploadPhoto from "./UploadPhoto";
import CategoryTitle from "../common/CategoryTitle";
import ShadowInput from "../common/input/ShadowInput";
import SidePaddingContainer from "../common/container/SidePaddingContainer";

const Container = styled.ScrollView``;

const WitnessedAnimalInfo = () => {
  return (
    <Container>
      <CategoryTitle>목격 동물 정보</CategoryTitle>
      <UploadPhoto />
      <SidePaddingContainer>
        <ShadowInput placeholder="이름" />
      </SidePaddingContainer>
    </Container>
  );
};

export default WitnessedAnimalInfo;
