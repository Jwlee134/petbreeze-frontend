import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import Points from "../Points";

const Container = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin: 0 auto;
`;

const Scanning = () => (
  <Container>
    <MyText fontSize={24} fontWeight="medium">
      디바이스 검색중
    </MyText>
    <Points />
  </Container>
);

export default React.memo(Scanning);
