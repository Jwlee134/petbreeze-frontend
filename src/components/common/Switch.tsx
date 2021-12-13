import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";
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
  const value = useRef(new Animated.Value(0)).current;

  const backgroundColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(120, 120, 128, 0.16)", palette.blue_86],
  });

  const translateX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 30],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [isOn]);

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainer style={{ backgroundColor }}>
          <ToggleWheel style={{ transform: [{ translateX }] }} />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default Switch;
