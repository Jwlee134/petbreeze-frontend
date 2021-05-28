import React from "react";
import { Platform, TextInputProps } from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

interface IProps extends TextInputProps {
  isHomeInput?: boolean;
  RightIcon?: () => JSX.Element;
}

interface IContainerProps {
  isHomeInput?: boolean;
}

const Container = styled.View<IContainerProps>`
  background-color: white;
  width: 100%;
  height: 46px;
  border-width: 1px;
  border-color: ${palette.gray_d5};
  border-radius: 4px;
  justify-content: center;
  padding: ${Platform.OS === "android" ? "0px 11px" : "0px 17px"};
  ${({ isHomeInput }) =>
    isHomeInput &&
    css`
      height: 35px;
      border-radius: 0;
    `}
`;

const TextInput = styled.TextInput`
  color: black;
  font-size: 16px;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 9px;
`;

const Input = ({ isHomeInput, RightIcon, ...props }: IProps) => (
  <Container
    isHomeInput={isHomeInput}
    pointerEvents={!isHomeInput ? "auto" : "none"}>
    <TextInput {...props} />
    {RightIcon && (
      <IconContainer>
        <RightIcon />
      </IconContainer>
    )}
  </Container>
);

export default Input;
