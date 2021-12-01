import React, { ReactNode } from "react";
import { Animated, TextProps, TextStyle } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

export type FontWeight = "light" | "medium" | "bold";

interface Props extends Animated.AnimatedProps<TextProps> {
  children: ReactNode;
  fontWeight?: FontWeight;
  fontSize?: number | undefined;
  color?: string;
  style?: Animated.AnimatedProps<TextStyle>;
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
  ...props
}: Props) => (
  <SText
    fontWeight={fontWeight}
    style={{
      includeFontPadding: false,
      color: color || palette.black_2e,
      flexShrink: 1,
      fontSize: fontSize || 16,
      ...(style as object),
    }}
    {...props}>
    {children}
  </SText>
);

export default MyText;
