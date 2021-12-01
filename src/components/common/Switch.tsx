import React from "react";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface Props {
  isOn: boolean;
  onToggle: () => void;
}

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 32px;
`;

const ToggleContainer = styled(Animated.View)`
  width: 51px;
  height: 23px;
  border-radius: 25.5px;
  justify-content: center;
`;

const ToggleWheel = styled(Animated.View)`
  width: 16px;
  height: 15px;
  border-radius: 8px;
  background-color: white;
`;

const Switch = ({ isOn, onToggle }: Props) => {
  const color = useSharedValue(0);
  const trans = useSharedValue(0);

  const backgroundColorToggle = useAnimatedStyle(() => {
    color.value = isOn ? 1 : 0;
    const backgroundColor = interpolateColor(
      color.value,
      [0, 1],
      ["rgba(120, 120, 128, 0.16)", palette.blue_86],
    );
    return {
      backgroundColor: withTiming(backgroundColor, {
        duration: 200,
        easing: Easing.linear,
      }),
    };
  }, [isOn]);

  const moveSwitchToggle = useAnimatedStyle(() => {
    trans.value = isOn ? 1 : 0;
    const translateX = interpolate(trans.value, [0, 1], [5, 30]);
    return {
      transform: [
        {
          translateX: withTiming(translateX, {
            duration: 200,
            easing: Easing.linear,
          }),
        },
      ],
    };
  }, [isOn]);

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainer style={[backgroundColorToggle]}>
          <ToggleWheel style={[moveSwitchToggle]} />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default Switch;
