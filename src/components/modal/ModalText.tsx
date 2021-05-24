import React, { ReactNode } from "react";
import styled from "styled-components/native";

const Container = styled.Text`
  font-size: 17px;
  text-align: center;
`;

const ModalText = ({ children }: { children: ReactNode }) => (
  <Container>{children}</Container>
);

export default ModalText;
