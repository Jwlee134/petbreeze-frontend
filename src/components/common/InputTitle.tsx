import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import MyText from "./MyText";

const Container = styled.View`
  height: 37px;
  padding-left: 4px;
  justify-content: center;
`;

const InputTitle = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => (
  <Container style={style}>
    <MyText fontSize={14} color="rgba(0, 0, 0, 0.5)">
      {children}
    </MyText>
  </Container>
);

export default InputTitle;
