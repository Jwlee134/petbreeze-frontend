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
  isLiveToggle?: boolean;
}

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToggleContainer = styled(Animated.View)<{ isLiveToggle: boolean }>`
  width: ${({ isLiveToggle }) => (isLiveToggle ? 44 : 52)}px;
  height: 24px;
  border-radius: 100px;
  justify-content: center;
`;

const ToggleWheel = styled(Animated.View)<{ isLiveToggle: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: white;
`;

const Switch = ({ isOn, onToggle, isLiveToggle = false }: Props) => {
  const value = useDerivedValue(() => (isOn ? withTiming(1) : withTiming(0)));

  const backgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      value.value,
      [0, 1],
      ["rgba(120, 120, 128, 0.16)", palette.blue_86],
    ),
  }));

  const translateX = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          value.value,
          [0, 1],
          [4, isLiveToggle ? 24 : 32],
        ),
      },
    ],
  }));

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainer isLiveToggle={isLiveToggle} style={[backgroundColor]}>
          <ToggleWheel isLiveToggle={isLiveToggle} style={[translateX]} />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default Switch;
