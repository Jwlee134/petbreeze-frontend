import React, { ForwardedRef, forwardRef } from "react";
import { StyleProp, TextInput, TextInputProps, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";
import ShadowContainer from "./ShadowContainer";

interface IProps extends TextInputProps {
  shadowContainerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  isInputEditable?: boolean;
}

const Container = styled.View<{ disabled: boolean }>`
  width: 100%;
  height: 46px;
  padding: 0px 11px;
  margin-top: 13px;
  background-color: white;
  border-radius: 4px;
  justify-content: center;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${palette.light_grey};
    `}
`;

const InputComponent = styled.TextInput`
  font-size: 16px;
  color: black;
`;

const Input = forwardRef(
  (
    {
      shadowContainerStyle,
      disabled = false,
      isInputEditable = true,
      ...props
    }: IProps,
    ref: ForwardedRef<TextInput>,
  ) => (
    <ShadowContainer shadowContainerStyle={shadowContainerStyle}>
      <Container
        pointerEvents={isInputEditable ? "auto" : "none"}
        disabled={disabled}>
        <InputComponent ref={ref} {...props} />
      </Container>
    </ShadowContainer>
  ),
);

export default Input;
