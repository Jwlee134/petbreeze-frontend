import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 0px 15px;
  position: relative;
`;

const SidePaddingContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => <Container style={style}>{children}</Container>;

export default SidePaddingContainer;
