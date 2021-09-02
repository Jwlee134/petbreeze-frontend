import React from "react";
import { useState } from "react";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import MyText from "./MyText";

interface IProps extends TextInputProps {
  title?: string;
  solidPlaceholderTitle?: string;
  alignLeftSolidPlaceholderWhenFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

interface IContainer {
  isFocused: boolean;
}

interface ITextInput {}

const Container = styled.View<IContainer>`
  width: 100%;
  height: ${rpWidth(37)}px;
  flex-direction: row;
  padding: 0px ${rpWidth(9)}px;
  margin-bottom: ${rpWidth(14)}px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ isFocused }) =>
    !isFocused ? "rgba(0, 0, 0, 0.1)" : palette.blue_7b};
`;

const TextInput = styled.TextInput<ITextInput>`
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: ${rpWidth(16)}px;
  flex-grow: 1;
`;

const Input = ({
  title,
  solidPlaceholderTitle,
  alignLeftSolidPlaceholderWhenFocus = false,
  containerStyle,
  ...props
}: IProps) => {
  const [isFocused, setIsFocused] = useState(!!props.value || false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!props.value) {
      setIsFocused(false);
    }
  };

  return (
    <Container style={containerStyle} isFocused={isFocused}>
      <TextInput onFocus={handleFocus} onBlur={handleBlur} {...props} />
      {solidPlaceholderTitle && (
        <MyText
          style={{
            ...(alignLeftSolidPlaceholderWhenFocus &&
              isFocused && {
                position: "absolute",
                left: rpWidth(35),
              }),
          }}
          fontSize={14}
          color="rgba(0, 0, 0, 0.3)">
          {solidPlaceholderTitle}
        </MyText>
      )}
    </Container>
  );
};

export default Input;
