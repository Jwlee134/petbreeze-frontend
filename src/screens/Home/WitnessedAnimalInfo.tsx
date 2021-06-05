import React from "react";
import styled from "styled-components/native";

import UploadPhoto from "~/components/UploadPhoto";
import CategoryTitle from "~/components/common/CategoryTitle";
import Input from "~/components/common/Input";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import { useNavigation } from "@react-navigation/core";
import { PostAnimalInfoScreenNavigationProp } from "~/types/navigator";

const Container = styled.ScrollView``;

const WitnessedAnimalInfo = () => {
  const navigation = useNavigation<PostAnimalInfoScreenNavigationProp>();

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
