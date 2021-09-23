import React, { ReactNode, useContext } from "react";
import { Animated, StyleProp, TextProps, TextStyle } from "react-native";
import styled from "styled-components/native";
import { DimensionsContext } from "~/context/DimensionsContext";

export type FontWeight = "light" | "medium" | "bold";

interface IProps extends Animated.AnimatedProps<TextProps> {
  children: ReactNode;
  fontWeight?: FontWeight;
  fontSize?: number | undefined;
  color?: string;
  style?: Animated.AnimatedProps<StyleProp<TextStyle>>;
}

interface IText {
  fontWeight: FontWeight | undefined;
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
`;

const MyText = ({
  children,
  fontWeight,
  fontSize,
  color,
  style,
  ...props
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Text
      fontWeight={fontWeight}
      style={{
        includeFontPadding: false,
        color: color || "rgba(0, 0, 0, 0.8)",
        flexShrink: 1,
        fontSize: fontSize !== undefined ? rpWidth(fontSize) : rpWidth(16),
        ...(style as object),
      }}
      {...props}>
      {children}
    </Text>
  );
};

export default MyText;
