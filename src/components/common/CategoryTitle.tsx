import React, { ReactNode } from "react";
import styled from "styled-components/native";
import palette from "~/styles/palette";

const Container = styled.View`
  width: 100%;
  height: 36px;
  background-color: ${palette.blue};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 18px;
`;

const CategoryTitle = ({ children }: { children: ReactNode }) => (
  <Container>
    <Title>{children}</Title>
  </Container>
);

export default CategoryTitle;
