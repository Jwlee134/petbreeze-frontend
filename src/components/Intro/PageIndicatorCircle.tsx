import React, { useRef } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

const Container = styled.View`
  width: 16px;
  align-items: center;
  margin: 0px 2.5px;
`;

const Circle = styled(Animated.View)`
  height: 7px;
  border-radius: 7px;
`;

const PageIndicatorCircle = ({ isFocused }: { isFocused: boolean }) => {
  const value = useRef(new Animated.Value(0)).current;

  const width = value.interpolate({
    inputRange: [0, 1],
    outputRange: [7, 16],
  });

  const backgroundColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: [palette.gray_c4, palette.blue_7b],
  });

  Animated.timing(value, {
    toValue: isFocused ? 1 : 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  return (
    <Container>
      <Circle style={{ width, backgroundColor }} />
    </Container>
  );
};

export default PageIndicatorCircle;
