import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import styled from "styled-components/native";

const Divider = styled.View`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  height: ${StyleSheet.hairlineWidth}px;
`;

const HairlineDivider = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <Divider style={style} />
);

export default HairlineDivider;
