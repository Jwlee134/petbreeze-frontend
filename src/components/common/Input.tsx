import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";
import MyText from "./MyText";

interface Props extends TextInputProps {
  solidPlaceholderTitle?: string;
  alignLeftSolidPlaceholderWhenFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isWhiteBorder?: boolean;
  hasBorder?: boolean;
  style?: StyleProp<TextStyle>;
}

interface ContainerProps {
  isFocused: boolean;
  isMultiline: boolean;
}

const Container = styled.View`
  margin-bottom: 20px;
`;

const InputContainer = styled.View<ContainerProps>`
  ${({ isMultiline }) => css`
    height: ${isMultiline ? "auto" : "36px"};
    min-height: ${isMultiline ? "36px" : "auto"};
  `}
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const TextInputComponent = styled.TextInput`
  font-size: 16px;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: "NotoSansKR-Regular";
`;

const BorderContainer = styled.View<{ isWhiteBorder: boolean }>`
  width: 100%;
  height: 1px;
  align-items: center;
  background-color: ${({ isWhiteBorder }) =>
    isWhiteBorder ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"};
`;

const Border = styled(Animated.View)`
  height: 100%;
`;

const Input = forwardRef(
  (
    {
      solidPlaceholderTitle,
      alignLeftSolidPlaceholderWhenFocus = false,
      containerStyle,
      isWhiteBorder = false,
      hasBorder = true,
      style,
      ...props
    }: Props,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [borderWidth, setBorderWidth] = useState(0);
    const [isFocused, setIsFocused] = useState(!!props.value || false);
    const value = useDerivedValue(() => (isFocused ? borderWidth : 0));

    useEffect(() => {
      if (props.value && !isFocused) setIsFocused(true);
    }, [props.value]);

    const width = useAnimatedStyle(
      () => ({ width: withTiming(value.value, { duration: 200 }) }),
      [isFocused, borderWidth],
    );

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!props.value) {
        setIsFocused(false);
      }
    };

    return (
      <Container style={containerStyle}>
        <InputContainer
          isMultiline={props.multiline || false}
          isFocused={isFocused}>
          <TextInputComponent
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              paddingVertical: 0,
              paddingHorizontal: 9,
              includeFontPadding: false,
              color: isWhiteBorder ? "white" : "rgba(0, 0, 0, 0.7)",
              ...(style as object),
            }}
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            selectionColor={
              isWhiteBorder ? "rgba(255, 255, 255, 0.3)" : undefined
            }
            {...props}
          />
          {solidPlaceholderTitle && (
            <MyText
              style={{
                position: "absolute",
                zIndex: -1,
                right: 9,
                ...(alignLeftSolidPlaceholderWhenFocus &&
                  isFocused && {
                    left: 35,
                  }),
              }}
              fontSize={14}
              color="rgba(0, 0, 0, 0.3)">
              {solidPlaceholderTitle}
            </MyText>
          )}
        </InputContainer>
        {hasBorder ? (
          <BorderContainer
            isWhiteBorder={isWhiteBorder}
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }) => setBorderWidth(width)}>
            <Border
              style={[
                width,
                { backgroundColor: isWhiteBorder ? "white" : palette.blue_7b },
              ]}
            />
          </BorderContainer>
        ) : null}
      </Container>
    );
  },
);

export default Input;
