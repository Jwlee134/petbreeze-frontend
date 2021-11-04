import React, {
  ForwardedRef,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  StyleProp,
  TextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import MyText from "./MyText";

interface IProps extends TextInputProps {
  solidPlaceholderTitle?: string;
  alignLeftSolidPlaceholderWhenFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isWhiteBorder?: boolean;
  hasBorder?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface IContainer {
  isFocused: boolean;
  rpWidth: RpWidth;
  isMultiline: boolean;
}

const Container = styled.View<{ rpWidth: RpWidth }>`
  margin-bottom: ${({ rpWidth }) => rpWidth(20)}px;
`;

const InputContainer = styled.View<IContainer>`
  ${({ rpWidth, isMultiline }) => css`
    height: ${isMultiline ? "auto" : `${rpWidth(36)}px`};
    min-height: ${isMultiline ? `${rpWidth(36)}px` : "auto"};
  `}
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const TextInputComponent = styled.TextInput<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    font-size: ${rpWidth(16)}px;
  `}
  margin: 0;
  width: 100%;
  height: 100%;
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
      solidPlaceholderTitle,
      alignLeftSolidPlaceholderWhenFocus = false,
      containerStyle,
      isWhiteBorder,
      hasBorder = true,
      style,
      ...props
    }: IProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(!!props.value || false);
    const value = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
    const { rpWidth } = useContext(DimensionsContext);

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
      <Container rpWidth={rpWidth} style={containerStyle}>
        <InputContainer
          isMultiline={props.multiline || false}
          rpWidth={rpWidth}
          isFocused={isFocused}>
          <TextInputComponent
            rpWidth={rpWidth}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              paddingVertical: 0,
              paddingHorizontal: rpWidth(9),
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
        {hasBorder ? (
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
        ) : null}
      </Container>
    );
  },
);

export default Input;
