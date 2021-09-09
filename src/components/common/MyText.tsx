import React, { ReactNode } from "react";
import { Animated, StyleProp, TextProps, TextStyle } from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";

export type fontWeight = "light" | "medium" | "bold";

interface IProps extends Animated.AnimatedProps<TextProps> {
  children: ReactNode;
  fontWeight?: fontWeight;
  fontSize?: number | undefined;
  color?: string;
  style?: Animated.AnimatedProps<StyleProp<TextStyle>>;
}

interface IText {
  fontWeight: fontWeight | undefined;
  fontSize?: number | undefined;
}

const Text = styled(Animated.Text)<IText>`
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
  font-size: ${({ fontSize }) =>
    fontSize !== undefined ? `${rpWidth(fontSize)}px` : `${rpWidth(16)}px`};
`;

const MyText = ({
  children,
  fontWeight,
  fontSize,
  color,
  style,
  ...props
}: IProps) => (
  <Text
    fontWeight={fontWeight}
    fontSize={fontSize}
    style={{
      includeFontPadding: false,
      color,
      flexShrink: 1,
      ...(style as object),
    }}
    {...props}>
    {children}
  </Text>
);

export default MyText;
