import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  isVertical: boolean;
  isHairline: boolean;
  width?: number;
  height?: number;
}

const Container = styled.View<ContainerProps>`
  background-color: ${({ isHairline }) =>
    isHairline ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.03)"};
  ${({ isVertical, isHairline }) =>
    isVertical
      ? css`
          height: 100%;
          width: ${StyleSheet.hairlineWidth}px;
        `
      : css`
          width: 100%;
          height: ${isHairline ? StyleSheet.hairlineWidth : 4}px;
        `}
  ${({ width, height }) => {
    if (width)
      return css`
        width: ${width}px;
      `;
    if (height)
      return css`
        height: ${height}px;
      `;
  }}
`;

const Divider = ({
  style,
  isVertical = false,
  isHairline = true,
  width,
  height,
}: {
  style?: StyleProp<ViewStyle>;
  isVertical?: boolean;
  isHairline?: boolean;
  width?: number;
  height?: number;
}) => (
  <Container
    isHairline={isHairline}
    isVertical={isVertical}
    width={width}
    height={height}
    style={style}
  />
);

export default Divider;
