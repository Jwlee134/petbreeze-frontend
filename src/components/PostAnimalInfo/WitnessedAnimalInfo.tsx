import React from "react";
import styled from "styled-components/native";

import UploadPhoto from "./UploadPhoto";
import CategoryTitle from "../common/CategoryTitle";
import Input from "../common/Input";
import SidePaddingContainer from "../common/SidePaddingContainer";

const Container = styled.ScrollView``;

const WitnessedAnimalInfo = () => {
  return (
    <Container>
      <CategoryTitle>목격 동물 정보</CategoryTitle>
      <UploadPhoto />
      <SidePaddingContainer>
        <Input placeholder="이름" />
      </SidePaddingContainer>
    </Container>
  );
};

export default WitnessedAnimalInfo;
