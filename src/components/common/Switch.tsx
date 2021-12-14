import React from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
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
  const value = useDerivedValue(() => (isOn ? withTiming(1) : withTiming(0)));

  const backgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      value.value,
      [0, 1],
      ["rgba(120, 120, 128, 0.16)", palette.blue_86],
    ),
  }));

  const translateX = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(value.value, [0, 1], [5, 30]) }],
  }));

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainer style={[backgroundColor]}>
          <ToggleWheel style={[translateX]} />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default Switch;
