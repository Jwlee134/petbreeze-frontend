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
}

interface IContainer {
  isFocused: boolean;
}

const Container = styled.View`
  margin-bottom: ${rpWidth(20)}px;
`;

const InputContainer = styled.View<IContainer>`
  width: 100%;
  height: ${rpWidth(37)}px;
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
  color: black;
`;

const BorderContainer = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
`;

const Border = styled(Animated.View)`
  height: 100%;
  background-color: ${palette.blue_7b};
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
            }}
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
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
        <BorderContainer>
          <Border style={{ width: borderWidth }} />
        </BorderContainer>
      </Container>
    );
  },
);

export default Input;
