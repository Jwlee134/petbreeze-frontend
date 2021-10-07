import React, { useContext } from "react";
import { Animated, StyleSheet } from "react-native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";
import ShadowContainer from "../common/container/ShadowContainer";

interface IProps {
  value: Animated.AnimatedInterpolation;
  mapPadding: {
    top: number;
    bottom: number;
  };
}

const OuterMarker = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(22)}px;
    height: ${rpWidth(22)}px;
    border-radius: ${rpWidth(11)}px;
  `}
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InnerMarker = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(16)}px;
    height: ${rpWidth(16)}px;
    border-radius: ${rpWidth(8)}px;
  `}
  background-color: ${palette.blue_7b};
`;

const FakeMarker = ({ mapPadding, value }: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        ...(StyleSheet.absoluteFill as object),
        marginTop: mapPadding.top,
        marginBottom: mapPadding.bottom,
        transform: [{ translateY: value }],
      }}>
      <ShadowContainer
        shadowRadius={12}
        shadowOpacity={0.3}
        style={{
          position: "absolute",
          alignSelf: "center",
          top: "50%",
          marginTop: -rpWidth(11),
        }}>
        <OuterMarker rpWidth={rpWidth}>
          <InnerMarker rpWidth={rpWidth} />
        </OuterMarker>
      </ShadowContainer>
    </Animated.View>
  );
};

export default FakeMarker;
