import React, { ReactNode } from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import palette from "~/styles/palette";

export type FontWeight = "light" | "medium" | "bold";

interface Props extends TextProps {
  children: ReactNode;
  fontWeight?: FontWeight;
  fontSize?: number | undefined;
  color?: string;
  style?: StyleProp<TextStyle>;
  animatedStyle?: { color?: string | number; opacity?: number };
}

interface STextProps {
  fontWeight: FontWeight | undefined;
}

const SText = styled(Animated.Text)<STextProps>`
  font-family: ${({ fontWeight }) => {
    switch (fontWeight) {
      case "bold":
        return "NotoSansKR-Bold";
      case "medium":
        return "NotoSansKR-Medium";
      case "light":
        return "NotoSansKR-Light";
      default:
        return "NotoSansKR-Regular";
    }
  }};
`;

const MyText = ({
  children,
  fontWeight,
  fontSize,
  color,
  style,
  animatedStyle,
  ...props
}: Props) => (
  <SText
    fontWeight={fontWeight}
    style={[
      {
        includeFontPadding: false,
        color: color || palette.black_2e,
        flexShrink: 1,
        fontSize: fontSize || 16,
        ...(style as object),
      },
      animatedStyle,
    ]}
    {...props}>
    {children}
  </SText>
);

export default MyText;
