import React from "react";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import Check from "~/assets/svg/check/check-white.svg";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const Container = styled(Animated.View)`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  justify-content: center;
  align-items: center;
`;

const CheckCircle = ({ selected }: { selected: boolean }) => {
  const value = useDerivedValue(() =>
    selected
      ? withTiming(1, { duration: 200, easing: Easing.linear })
      : withTiming(0, { duration: 200, easing: Easing.linear }),
  );

  const style = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      value.value,
      [0, 1],
      ["rgba(0, 0, 0, 0.1)", palette.blue_86],
    ),
  }));

  return (
    <Container style={[style]}>
      <Check width={13} height={11} />
    </Container>
  );
};

export default CheckCircle;
