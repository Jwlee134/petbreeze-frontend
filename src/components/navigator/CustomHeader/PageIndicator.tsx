import React, { useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";

const PageBarBackground = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(4)}px;
    margin-top: ${rpWidth(5)}px;
  `}
`;

const PageBar = styled(Animated.View)`
  height: 100%;
  background-color: ${palette.blue_7b_90};
`;

const PageIndicator = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  const { rpWidth } = useContext(DimensionsContext);
  const value = useRef(new Animated.Value(currentPage)).current;

  useEffect(() => {
    if (currentPage) {
      Animated.timing(value, {
        toValue: currentPage,
        useNativeDriver: false,
        duration: 200,
      }).start();
    }
  }, [currentPage]);

  const widthInterpolate = value.interpolate({
    inputRange: [0, currentPage],
    outputRange: ["0%", `${(currentPage / totalPage) * 100}%`],
  });

  return (
    <PageBarBackground
      rpWidth={rpWidth}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}>
      <PageBar style={{ width: widthInterpolate }} />
    </PageBarBackground>
  );
};

export default PageIndicator;
