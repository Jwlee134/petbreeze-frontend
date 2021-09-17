import React, { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { useState } from "react";
import {
  Animated,
  StyleProp,
  TextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import MyText from "./MyText";

interface IProps extends TextInputProps {
  title?: string;
  solidPlaceholderTitle?: string;
  alignLeftSolidPlaceholderWhenFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isWhiteBorder?: boolean;
}

interface IContainer {
  isFocused: boolean;
}

const Container = styled.View`
  margin-bottom: ${rpWidth(20)}px;
`;

const InputContainer = styled.View<IContainer>`
  width: 100%;
  height: ${rpWidth(36)}px;
  flex-direction: row;
  align-items: center;
`;

const TextInputComponent = styled.TextInput`
  margin: 0;
  padding: 0px ${rpWidth(9)}px;
  width: 100%;
  height: 100%;
  font-size: ${rpWidth(16)}px;
  font-family: "NotoSansKR-Regular";
`;

const BorderContainer = styled.View`
  width: 100%;
  height: 1px;
  align-items: center;
`;

const Border = styled(Animated.View)`
  height: 100%;
`;

const Input = forwardRef(
  (
    {
      title,
      solidPlaceholderTitle,
      alignLeftSolidPlaceholderWhenFocus = false,
      containerStyle,
      isWhiteBorder,
      ...props
    }: IProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(!!props.value || false);
    const value = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

    const borderWidth = value.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    });

    useEffect(() => {
      Animated.timing(value, {
        toValue: isFocused ? 1 : 0,
        useNativeDriver: false,
        duration: 200,
      }).start();
    }, [isFocused]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!props.value) {
        setIsFocused(false);
      }
    };

    return (
      <Container style={containerStyle}>
        <InputContainer isFocused={isFocused}>
          <TextInputComponent
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              includeFontPadding: false,
              color: isWhiteBorder ? "white" : "rgba(0, 0, 0, 0.7)",
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
                right: rpWidth(9),
                ...(alignLeftSolidPlaceholderWhenFocus &&
                  isFocused && {
                    left: rpWidth(35),
                  }),
              }}
              fontSize={14}
              color="rgba(0, 0, 0, 0.3)">
              {solidPlaceholderTitle}
            </MyText>
          )}
        </InputContainer>
        <BorderContainer
          style={{
            backgroundColor: isWhiteBorder
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 0, 0, 0.3)",
          }}>
          <Border
            style={{
              width: borderWidth,
              backgroundColor: isWhiteBorder ? "white" : palette.blue_7b,
            }}
          />
        </BorderContainer>
      </Container>
    );
  },
);

export default Input;
