import React, { ReactNode, useEffect, useRef, useState } from "react";
import { TouchableOpacityProps, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { SMALL_LOADING_INDICATOR_SIZE } from "~/styles/constants";
import palette from "~/styles/palette";
import LoadingIndicator from "../lottie/LoadingIndicator";
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
  const [disabled, setDisabled] = useState(props.disabled || !!delay);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (delay) {
      timeout.current = setTimeout(
        () => setDisabled(props.disabled || false),
        delay,
      );
    } else if (typeof props.disabled === "boolean") setDisabled(props.disabled);
    return () => timeout.current && clearTimeout(timeout.current);
  }, [props.disabled, delay]);

  const value = useDerivedValue(() =>
    disabled
      ? withTiming(0, { duration: 200, easing: Easing.linear })
      : withTiming(1, { duration: 200, easing: Easing.linear }),
  );
  const color = useAnimatedStyle(() => ({
    color: interpolateColor(
      value.value,
      [0, 1],
      ["rgba(0, 0, 0, 0.5)", fontColor || "white"],
    ),
  }));
  const bgColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      value.value,
      [0, 1],
      ["rgba(0, 0, 0, 0.05)", backgroundColor || palette.blue_86],
    ),
  }));

  return (
    <SButton
      width={width}
      style={{
        ...(useCommonMarginBottom && {
          marginBottom: useBottomInset ? 31.5 + bottom : 31.5,
        }),
        ...(style as object),
      }}
      disabled={disabled}
      {...props}>
      <Container style={[bgColor]}>
        {isLoading ? (
          <LoadingIndicator white size={SMALL_LOADING_INDICATOR_SIZE} />
        ) : (
          <>
            {RightIcon && <RightIcon />}
            <MyText fontWeight={fontWeight || "medium"} animatedStyle={color}>
              {children}
            </MyText>
          </>
        )}
      </Container>
    </SButton>
  );
};

export default Button;
