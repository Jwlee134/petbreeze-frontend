import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "./MyText";

const Container = styled.View`
  height: ${rpWidth(37)}px;
  justify-content: center;
  padding-left: ${rpWidth(9)}px;
`;

const InputTitle = ({ children }: { children: ReactNode }) => (
  <Container>
    <MyText fontSize={14} color="rgba(0, 0, 0, 0.5)">
      {children}
    </MyText>
  </Container>
);

export default InputTitle;
