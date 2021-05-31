import React, { ForwardedRef, forwardRef } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";
import ShadowContainer from "../container/ShadowContainer";

interface IProps extends TextInputProps {
  shadowContainerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  isInputEditable?: boolean;
  onPress?: () => void;
  isRow?: boolean;
}

const Button = styled.TouchableHighlight`
  border-radius: 4px;
`;

const Container = styled.View<{ disabled: boolean }>`
  width: 100%;
  height: 46px;
  padding: 0px 11px;
  background-color: white;
  border-radius: 4px;
  justify-content: center;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${palette.gray_f3};
    `}
`;

const InputComponent = styled.TextInput`
  font-size: 16px;
  color: black;
`;

const ShadowInput = forwardRef(
  (
    {
      shadowContainerStyle,
      buttonStyle,
      disabled = false,
      isInputEditable = true,
      onPress,
      style,
      isRow = false,
      ...props
    }: IProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const rowWidth = (useWindowDimensions().width - 63) / 2;

    return (
      <ShadowContainer
        shadowContainerStyle={{
          ...(shadowContainerStyle as object),
          marginTop: 13,
          ...(isRow && { width: rowWidth }),
        }}>
        {isInputEditable ? (
          <Container disabled={disabled} style={style}>
            <InputComponent ref={ref} placeholderTextColor="gray" {...props} />
          </Container>
        ) : (
          <Button
            style={buttonStyle}
            onPress={!disabled ? onPress : undefined}
            underlayColor={palette.gray_d5}>
            <Container disabled={disabled} pointerEvents="none" style={style}>
              <InputComponent
                ref={ref}
                placeholderTextColor="gray"
                {...props}
              />
            </Container>
          </Button>
        )}
      </ShadowContainer>
    );
  },
);

export default ShadowInput;
