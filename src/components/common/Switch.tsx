import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";

interface Props {
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

const Switch = ({ isOn, onToggle }: Props) => {
  const { rpWidth } = useContext(DimensionsContext);

  const color = useSharedValue(0);
  const trans = useSharedValue(0);

  const off = rpWidth(2);
  const on = rpWidth(22);

  const backgroundColorToggle = useAnimatedStyle(() => {
    color.value = isOn ? 1 : 0;
    const backgroundColor = interpolateColor(
      color.value,
      [0, 1],
      ["rgba(120, 120, 128, 0.16)", palette.blue_7b_80],
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
    const translateX = interpolate(trans.value, [0, 1], [off, on]);
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
    <Wrap rpWidth={rpWidth}>
      <Pressable onPress={onToggle}>
        <ToggleContainer rpWidth={rpWidth} style={[backgroundColorToggle]}>
          <ToggleWheel
            rpWidth={rpWidth}
            style={[styles.toggleWheel, moveSwitchToggle]}
          />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

export default Switch;
