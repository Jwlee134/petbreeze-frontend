import React, { ReactNode, useContext } from "react";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import MyText from "./MyText";

const Container = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(37)}px;
    padding-left: ${rpWidth(4)}px;
  `}
  justify-content: center;
`;

const InputTitle = ({ children }: { children: ReactNode }) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container rpWidth={rpWidth}>
      <MyText fontSize={14} color="rgba(0, 0, 0, 0.5)">
        {children}
      </MyText>
    </Container>
  );
};

export default InputTitle;
