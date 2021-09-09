import React, { useRef } from "react";
import { useEffect } from "react";
import MyText from "./MyText";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import { Animated } from "react-native";

const Container = styled.View`
  width: ${rpWidth(25)}px;
  flex-direction: row;
`;

const Points = ({ color }: { color?: string }) => {
  const value = useRef(new Animated.Value(0)).current;
  const value2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(400),
        Animated.timing(value2, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(400),
        Animated.parallel([
          Animated.timing(value, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(value2, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(400),
      ]),
    ).start();
  }, []);

  return (
    <Container>
      <MyText color={color ? color : "black"} fontSize={24} fontWeight="medium">
        .
      </MyText>
      <MyText
        style={{ opacity: value }}
        color={color ? color : "black"}
        fontSize={24}
        fontWeight="medium">
        .
      </MyText>
      <MyText
        style={{ opacity: value2 }}
        color={color ? color : "black"}
        fontSize={24}
        fontWeight="medium">
        .
      </MyText>
    </Container>
  );
};

export default React.memo(Points);
