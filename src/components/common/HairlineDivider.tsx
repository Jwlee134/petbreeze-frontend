import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";

const Divider = styled.View<{ isVertical: boolean }>`
  background-color: rgba(0, 0, 0, 0.3);
  ${({ isVertical }) =>
    isVertical
      ? css`
          height: 100%;
          width: ${StyleSheet.hairlineWidth}px;
        `
      : css`
          width: 100%;
          height: ${StyleSheet.hairlineWidth}px;
        `}
`;

const HairlineDivider = ({
  style,
  isVertical = false,
}: {
  style?: StyleProp<ViewStyle>;
  isVertical?: boolean;
}) => <Divider style={style} isVertical={isVertical} />;

export default HairlineDivider;
