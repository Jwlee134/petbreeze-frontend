import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Animated,
  TouchableOpacityProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import MyText, { FontWeight } from "./MyText";

interface IButton extends TouchableOpacityProps {
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

const TouchableOpacity = styled.TouchableOpacity<{
  width: number;
  rpWidth: RpWidth;
}>`
  ${({ width, rpWidth }) => css`
    width: ${width - rpWidth(32)}px;
    height: ${rpWidth(50.5)}px;
    border-radius: ${rpWidth(25)}px;
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
  ...props
}: IButton) => {
  const { bottom } = useSafeAreaInsets();
  const { rpWidth, width } = useContext(DimensionsContext);
  const [enableAfterDelay, setEnableAfterDelay] = useState(delay ?? false);
  const value = useRef(
    new Animated.Value(props.disabled || delay ? 0 : 1),
  ).current;

  const color = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.5)", fontColor || "white"],
  });

  const backgroundColorInterpolate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.05)", backgroundColor || palette.blue_7b_90],
  });

  useEffect(() => {
    if (enableAfterDelay) {
      setTimeout(() => {
        setEnableAfterDelay(false);
      }, delay);
    }
    Animated.timing(value, {
      toValue: props.disabled || enableAfterDelay ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [props.disabled, enableAfterDelay]);

  return (
    <TouchableOpacity
      width={width}
      rpWidth={rpWidth}
      style={{
        ...(useCommonMarginBottom && {
          marginBottom: useBottomInset ? rpWidth(31.5) + bottom : rpWidth(31.5),
        }),
      }}
      disabled={enableAfterDelay ? true : props.disabled}
      {...props}>
      <Container style={{ backgroundColor: backgroundColorInterpolate }}>
        {isLoading ? (
          <ActivityIndicator color="white" size={rpWidth(25)} />
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
    </TouchableOpacity>
  );
};

export default Button;
