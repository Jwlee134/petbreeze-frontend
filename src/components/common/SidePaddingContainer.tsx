import React, { ReactNode } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 0px 25px;
`;

const SidePaddingContainer = ({ children }: { children: ReactNode }) => (
  <Container>{children}</Container>
);

export default SidePaddingContainer;
