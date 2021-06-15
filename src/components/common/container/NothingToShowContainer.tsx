import React, { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  text-align: center;
  font-size: 16px;
`;

const NothingToShowContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) => (
  <Container>
    <Text style={style}>{children}</Text>
  </Container>
);

export default NothingToShowContainer;
