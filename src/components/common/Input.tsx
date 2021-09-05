import React, { ForwardedRef, forwardRef } from "react";
import { useState } from "react";
import { StyleProp, TextInput, TextInputProps, ViewStyle } from "react-native";
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

const TextInputComponent = styled.TextInput`
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: ${rpWidth(16)}px;
  font-family: "NotoSansKR-Regular";
  flex-grow: 1;
  color: black;
`;

const Input = forwardRef(
  (
    {
      title,
      solidPlaceholderTitle,
      alignLeftSolidPlaceholderWhenFocus = false,
      containerStyle,
      ...props
    }: IProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(!!props.value || false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!props.value) {
        setIsFocused(false);
      }
    };

    return (
      <Container style={containerStyle} isFocused={isFocused}>
        <TextInputComponent
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            includeFontPadding: false,
          }}
          {...props}
        />
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
  },
);

export default Input;
