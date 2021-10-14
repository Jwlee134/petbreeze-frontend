import React, { useContext, useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";

interface IProps {
  isOn: boolean;
  onToggle: () => void;
}

const Wrap = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  align-items: center;
  margin-right: ${({ rpWidth }) => rpWidth(32)}px;
`;

const ToggleContainer = styled(Animated.View)<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
  width:${rpWidth(51)}px
  height:${rpWidth(31)}px;
  border-radius:${rpWidth(25.5)}px;
  `}
  justify-content: center;
`;

const ToggleWheel = styled(Animated.View)<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
  width:${rpWidth(27)}px
  height:${rpWidth(27)}px;
  border-radius:${rpWidth(13.5)}px;
  `}
  background-color: white;
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

const Switch = ({ isOn, onToggle }: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const color = useRef(new Animated.Value(0)).current;
  const trans = useRef(new Animated.Value(0)).current;

  const moveSwitchToggle = trans.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(2), rpWidth(22)],
  });

  const backgroundColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(120, 120, 128, 0.16)", palette.blue_7b_80],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(color, {
        toValue: isOn ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
      Animated.timing(trans, {
        toValue: isOn ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  }, [isOn]);

  return (
    <Wrap rpWidth={rpWidth}>
      <Pressable onPress={onToggle}>
        <ToggleContainer rpWidth={rpWidth} style={{ backgroundColor }}>
          <ToggleWheel
            rpWidth={rpWidth}
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
