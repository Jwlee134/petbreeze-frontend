import React from "react";
import { ReactNode } from "react";
import { Marker as GoogleMarker, MarkerProps } from "react-native-maps";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

type Color = "green" | "blue" | "red" | undefined;

interface IProps extends MarkerProps {
  color?: Color;
  children?: ReactNode;
}

const Container = styled.View<{ color: Color }>`
  justify-content: center;
  align-items: center;
  ${({ color }) =>
    color === "green"
      ? css`
          width: 80px;
          height: 80px;
          border-radius: 40px;
          background-color: rgba(182, 225, 61, 0.5);
          border-width: 1px;
          border-color: ${palette.blue_53};
        `
      : color === "red"
      ? css`
          width: 30px;
          height: 30px;
          border-radius: 15px;
          border-width: 1px;
          border-color: ${palette.red_de};
        `
      : css`
          width: 30px;
          height: 30px;
          border-radius: 15px;
        `}
`;

const Circle = styled.View<{ color: Color }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ color }) =>
    color === "green"
      ? palette.green_b6
      : color === "red"
      ? palette.red_de
      : color === "blue"
      ? palette.blue_6e
      : "black"};
`;

const Marker = ({ color, children, ...props }: IProps) => (
  <GoogleMarker anchor={{ x: 0.5, y: children ? 1 : 0.5 }} {...props}>
    {children ? (
      children
    ) : (
      <Container color={color}>
        <Circle color={color} />
      </Container>
    )}
  </GoogleMarker>
);

export default Marker;
