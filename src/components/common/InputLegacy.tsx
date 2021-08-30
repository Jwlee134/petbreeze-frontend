import React from "react";
import { useState } from "react";
import { TextInputProps } from "react-native";
import styled, { css } from "styled-components/native";
import { isAndroid } from "~/utils";

interface IProps extends TextInputProps {
  placeholder: string;
  isEditable?: boolean;
  isMultiline?: boolean;
  onPress?: () => void;
}

interface ITextInputProps {
  focused: boolean;
  multiline: boolean;
}

const Button = styled.TouchableOpacity``;

const Container = styled.View``;

const Placeholder = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
`;

const TextInput = styled.TextInput<ITextInputProps>`
  padding: 0;
  margin: 0;
  color: black;
  height: 36px;
  margin-bottom: 24px;
  width: 100%;
  font-size: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ focused }) =>
    focused ? "black" : "rgba(0, 0, 0, 0.2)"};
  ${({ multiline }) =>
    multiline &&
    css`
      height: auto;
      padding: ${isAndroid ? "3.5px 0px" : "8px 0px"};
    `}
`;

const Input = ({
  placeholder,
  isEditable = true,
  isMultiline = false,
  onPress,
  ...props
}: IProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <Button onPress={onPress} activeOpacity={1}>
      <Container pointerEvents={isEditable ? undefined : "none"}>
        <Placeholder>{placeholder}</Placeholder>
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor="rgba(0, 0, 0, 0.5)"
          focused={focused}
          multiline={isMultiline}
          {...props}
        />
      </Container>
    </Button>
  );
};

export default Input;
