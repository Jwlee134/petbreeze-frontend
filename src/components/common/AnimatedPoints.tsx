import React from "react";
import MyText, { FontWeight } from "./MyText";
import styled from "styled-components/native";
import { Animated, StyleProp, ViewStyle } from "react-native";

interface IProps {
  color?: string;
  value1?: Animated.Value;
  value2: Animated.Value;
  value3: Animated.Value;
  fontSize: number;
  fontWeight?: FontWeight;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const Container = styled.View`
  flex-direction: row;
`;

const Points = ({
  color,
  value1,
  value2,
  value3,
  fontSize = 20,
  fontWeight,
  text,
  style,
}: IProps) => {
  return (
    <Container style={style}>
      <MyText
        color={color ? color : "black"}
        fontSize={fontSize}
        fontWeight={fontWeight}>
        {text}
      </MyText>
      <MyText
        style={{ opacity: value1 ? value1 : 1 }}
        color={color ? color : "black"}
        fontSize={fontSize}
        fontWeight={fontWeight}>
        .
      </MyText>
      <MyText
        style={{ opacity: value2 }}
        color={color ? color : "black"}
        fontSize={fontSize}
        fontWeight={fontWeight}>
        .
      </MyText>
      <MyText
        style={{ opacity: value3 }}
        color={color ? color : "black"}
        fontSize={fontSize}
        fontWeight={fontWeight}>
        .
      </MyText>
    </Container>
  );
};

export default Points;
