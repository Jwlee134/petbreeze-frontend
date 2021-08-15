import React from "react";
import styled from "styled-components/native";
import MyText from "../common/MyText";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Scanning = () => (
  <Container>
    <MyText>디바이스 검색중</MyText>
  </Container>
);

export default Scanning;
