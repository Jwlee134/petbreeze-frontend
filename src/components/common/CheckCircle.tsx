import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import Check from "~/assets/svg/check/check-white.svg";

const Container = styled(Animated.View)`
  width: ${rpWidth(25)}px;
  height: ${rpWidth(25)}px;
  border-radius: ${rpWidth(12.5)}px;
  justify-content: center;
  align-items: center;
`;

const CheckCircle = ({ selected }: { selected: boolean }) => {
  const value = useRef(new Animated.Value(0)).current;

  const backgroundColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.1)", palette.blue_7b_90],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [selected]);

  return (
    <Container style={{ backgroundColor }}>
      <Check width={rpWidth(13)} height={rpWidth(11)} />
    </Container>
  );
};

export default CheckCircle;
