import React from "react";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";
import ShadowContainer from "./ShadowContainer";

interface IInput extends TextInputProps {
  shadowContainerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Container = styled.View<{ disabled: boolean }>`
  width: 100%;
  height: 46px;
  padding: 0px 11px;
  margin-top: 11px;
  background-color: white;
  border-radius: 4px;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${palette.light_grey};
    `}
`;

const TextInput = styled.TextInput`
  font-size: 16px;
  color: black;
`;

const Input = ({
  shadowContainerStyle,
  disabled = false,
  ...props
}: IInput) => (
  <ShadowContainer shadowContainerStyle={shadowContainerStyle}>
    <Container disabled={disabled}>
      <TextInput {...props} />
    </Container>
  </ShadowContainer>
);

export default Input;
