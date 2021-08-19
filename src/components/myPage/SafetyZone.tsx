import React from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";
import Shield from "~/assets/svg/myPage/shield.svg";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: ${rpWidth(29)}px 0px;
`;

const SvgContainer = styled.View`
  width: ${rpWidth(48)}px;
  align-items: center;
`;

const Container = styled.View``;

const SafetyZone = () => {
  return (
    <Container>
      <RowContainer>
        <SvgContainer>
          <Shield width={rpWidth(19)} height={rpWidth(20)} />
        </SvgContainer>
        <MyText>안심존</MyText>
      </RowContainer>
    </Container>
  );
};

export default SafetyZone;
