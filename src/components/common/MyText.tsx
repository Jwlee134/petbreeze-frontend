import React, { ReactNode } from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";

interface IProps extends TextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  fontWeight?: "light" | "medium" | "bold";
  fontSize: number | undefined;
}

interface IText {
  fontWeight: "light" | "medium" | "bold" | undefined;
  fontSize: number | undefined;
}

const Text = styled.Text<IText>`
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
  style,
  fontWeight,
  fontSize,
  ...props
}: IProps) => (
  <Text
    fontWeight={fontWeight}
    fontSize={fontSize}
    style={{
      includeFontPadding: false,
      ...(style as object),
    }}
    {...props}>
    {children}
  </Text>
);

export default MyText;
