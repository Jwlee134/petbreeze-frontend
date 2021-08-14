import React, { useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet } from "react-native";
import styled from "styled-components/native";

interface IProps {
  isOn: boolean;
  onColor?: string;
  offColor?: string;
  onToggle: () => void;
}

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToggleContainer = styled(Animated.View)`
  width: 55px;
  height: 25px;
  padding-left: 2px;
  border-radius: 15px;
  justify-content: center;
`;

const ToggleWheel = styled(Animated.View)`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 10px;
`;

const styles = StyleSheet.create({
  toggleWheel: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});

const Switch = ({
  isOn,
  onColor = "#246DFB",
  offColor = "#E8E8E9",
  onToggle,
}: IProps) => {
  const value = useRef(new Animated.Value(0)).current;

  const moveSwitchToggle = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 30],
  });

  const backgroundColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: [offColor, onColor],
  });

  Animated.timing(value, {
    toValue: isOn ? 1 : 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainer style={{ backgroundColor }}>
          <ToggleWheel
            style={[
              styles.toggleWheel,
              { transform: [{ translateX: moveSwitchToggle }] },
            ]}
          />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default Switch;
