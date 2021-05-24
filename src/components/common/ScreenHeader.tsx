import React, { ReactNode } from "react";
import styled, { css } from "styled-components/native";

interface IProps {
  children: ReactNode;
  size: "big" | "small";
  RightIcon?: () => JSX.Element;
}

const Container = styled.View<{ size: "big" | "small" }>`
  ${({ size }) =>
    size === "big"
      ? css`
          margin: 56px 0px 28px 0px;
        `
      : css`
          width: 100%;
          justify-content: center;
          margin: 28px 0px;
        `}
`;

const HeaderText = styled.Text<{ size: "big" | "small" }>`
  font-size: ${({ size }) => (size === "big" ? "36px" : "24px")};
  text-align: center;
`;

const RightIconContainer = styled.View`
  position: absolute;
  right: 25px;
`;

const ScreenHeader = ({ children, size, RightIcon }: IProps) => (
  <Container size={size}>
    <HeaderText size={size}>{children}</HeaderText>
    {RightIcon && (
      <RightIconContainer>
        <RightIcon />
      </RightIconContainer>
    )}
  </Container>
);

export default ScreenHeader;
