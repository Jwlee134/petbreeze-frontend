import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

const PageBarBackground = styled.View`
  height: 4px;
  margin-top: 5px;
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
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}>
      <PageBar style={{ width: widthInterpolate }} />
    </PageBarBackground>
  );
};

export default PageIndicator;
