import React from "react";
import { useState } from "react";
import { TextInputProps, View } from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";

interface IProps extends TextInputProps {
  title?: string;
  isRow?: boolean;
}

interface ITextInput {
  isFocused: boolean;
  isRow: boolean;
}

const TextInput = styled.TextInput<ITextInput>`
  margin: 0;
  margin-bottom: ${rpWidth(14)}px;
  padding: 0px ${rpWidth(9)}px;
  width: ${({ isRow }) => (isRow ? "auto" : "100%")};
  height: ${rpWidth(37)}px;
  font-size: ${rpWidth(16)}px;
  border-bottom-width: 1px;
  border-color: ${({ isFocused }) =>
    !isFocused ? "rgba(0, 0, 0, 0.1)" : palette.blue_7b};
`;

const Input = ({ title, isRow = false, ...props }: IProps) => {
  const [isFocused, setIsFocused] = useState(!!props.value || false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!props.value) {
      setIsFocused(false);
    }
  };

  return (
    <TextInput
      isRow={isRow}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isFocused={isFocused}
      {...props}
    />
  );
};

export default Input;
