import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  TouchableOpacityProps,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";
import MyText, { FontWeight } from "./MyText";

interface Props extends TouchableOpacityProps {
  children?: ReactNode;
  RightIcon?: () => JSX.Element;
  isLoading?: boolean;
  fontWeight?: FontWeight;
  fontColor?: string;
  useCommonMarginBottom?: boolean;
  useBottomInset?: boolean;
  backgroundColor?: string;
  delay?: number;
}

const SButton = styled.TouchableOpacity<{ width: number }>`
  ${({ width }) => css`
    width: ${width - 32}px;
    height: 50.5px;
    border-radius: 25px;
  `}
  margin: 0 auto;
  overflow: hidden;
`;

const Container = styled(Animated.View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = ({
  children,
  RightIcon,
  fontWeight,
  fontColor,
  isLoading = false,
  useCommonMarginBottom = false,
  useBottomInset = false,
  backgroundColor,
  delay,
  style,
  ...props
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const value = useRef(
    new Animated.Value(props.disabled || delay ? 0 : 1),
  ).current;
  const [disableDuringDelay, setDisableDuringDelay] = useState(
    !!delay ?? false,
  );

  const color = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.5)", fontColor || "white"],
  });

  const backgroundColorInterpolate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.05)", backgroundColor || palette.blue_86],
  });

  const transition = () =>
    Animated.timing(value, {
      toValue: props.disabled ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    });

  useEffect(() => {
    if (delay) {
      setTimeout(() => {
        setDisableDuringDelay(false);
      }, delay);
      Animated.sequence([Animated.delay(delay), transition()]).start();
    } else {
      transition().start();
    }
  }, [props.disabled, delay]);

  return (
    <SButton
      width={width}
      style={{
        ...(useCommonMarginBottom && {
          marginBottom: useBottomInset ? 31.5 + bottom : 31.5,
        }),
        ...(style as object),
      }}
      disabled={disableDuringDelay || props.disabled}
      {...props}>
      <Container style={{ backgroundColor: backgroundColorInterpolate }}>
        {isLoading ? (
          <ActivityIndicator color="white" size={25} />
        ) : (
          <>
            {RightIcon && <RightIcon />}
            <MyText
              fontWeight={fontWeight || "medium"}
              style={{
                color,
              }}>
              {children}
            </MyText>
          </>
        )}
      </Container>
    </SButton>
  );
};

export default Button;
