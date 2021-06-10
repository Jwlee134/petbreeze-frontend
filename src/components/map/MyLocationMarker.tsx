import React from "react";
import { Marker, MarkerProps } from "react-native-maps";
import styled from "styled-components/native";

interface IProps extends MarkerProps {}

const Container = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgba(182, 225, 61, 0.5);
  border-width: 1px;
  border-color: #5387bc;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #b6e13d;
`;

const MyLocationMarker = ({ ...props }: IProps) => (
  <Marker {...props}>
    <Container>
      <Circle />
    </Container>
  </Marker>
);

export default MyLocationMarker;
