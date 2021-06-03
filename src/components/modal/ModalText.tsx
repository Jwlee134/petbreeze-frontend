import React, { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";

const Container = styled.Text`
  font-size: 17px;
  text-align: center;
`;

const ModalText = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) => <Container style={style}>{children}</Container>;

export default ModalText;
