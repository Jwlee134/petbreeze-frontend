import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";
import ShadowContainer from "./container/ShadowContainer";

interface IInputProps {
  disabled?: boolean;
  isMultiline?: boolean;
  hasShadow?: boolean;
}

interface IProps extends IInputProps, TextInputProps {
  shadowContainerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  isInputEditable?: boolean;
  onPress?: () => void;
  isRow?: boolean;
  RightIcon?: () => JSX.Element;
}

const Button = styled.TouchableHighlight`
  border-radius: 4px;
`;

const Container = styled.View`
  justify-content: center;
`;

const TextInputComponent = styled.TextInput<IInputProps>`
  font-size: 16px;
  color: black;
  padding: 0px 11px;
  width: 100%;
  height: 46px;
  background-color: white;
  border-radius: 4px;
  justify-content: center;
  ${({ hasShadow }) =>
    !hasShadow &&
    css`
      border-width: 1px;
      border-color: ${palette.gray_d5};
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${palette.gray_f3};
    `}
  ${({ isMultiline }) =>
    isMultiline &&
    css`
      padding: ${Platform.OS === "android" ? "9px 11px" : "13px 11px"};
      min-height: 46px;
      height: auto;
    `}
`;

const IconContainer = styled.View<{ isMultiline: boolean }>`
  position: absolute;
  right: 11px;
  ${({ isMultiline }) =>
    isMultiline &&
    css`
      bottom: 10.5px;
    `}
`;

const Input = forwardRef(
  (
    {
      shadowContainerStyle,
      buttonStyle,
      disabled = false,
      isInputEditable = true,
      onPress,
      isRow = false,
      isMultiline = false,
      hasShadow = true,
      RightIcon,
      ...props
    }: IProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const rowWidth = (useWindowDimensions().width - 63) / 2;

    /* input editable 속성으로 컨트롤할 시 iOS에서는 클릭이 아예 불가 */

    if (hasShadow) {
      return (
        <ShadowContainer
          shadowContainerStyle={{
            ...(shadowContainerStyle as object),
            marginTop: 13,
            ...(isRow && { width: rowWidth }),
          }}>
          <Button
            style={buttonStyle}
            onPress={!disabled ? onPress : undefined}
            underlayColor={palette.gray_d5}>
            <Container pointerEvents={isInputEditable ? undefined : "none"}>
              <TextInputComponent
                hasShadow={hasShadow}
                disabled={disabled}
                multiline={isMultiline}
                isMultiline={isMultiline}
                ref={ref}
                placeholderTextColor="gray"
                {...props}
              />
              {RightIcon && (
                <IconContainer isMultiline={isMultiline}>
                  <RightIcon />
                </IconContainer>
              )}
            </Container>
          </Button>
        </ShadowContainer>
      );
    }

    return (
      <Button
        style={buttonStyle}
        onPress={!disabled ? onPress : undefined}
        underlayColor={palette.gray_d5}>
        <Container pointerEvents={isInputEditable ? undefined : "none"}>
          <TextInputComponent
            hasShadow={hasShadow}
            disabled={disabled}
            multiline={isMultiline}
            isMultiline={isMultiline}
            ref={ref}
            placeholderTextColor="gray"
            {...props}
          />
          {RightIcon && (
            <IconContainer isMultiline={isMultiline}>
              <RightIcon />
            </IconContainer>
          )}
        </Container>
      </Button>
    );
  },
);

export default Input;
