import React, { memo, useEffect, useRef } from "react";
import styled, { css } from "styled-components/native";
import { AnimatedCircularProgress as RNCircularProgress } from "react-native-circular-progress";
import palette from "~/styles/palette";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import Icon from "~/assets/svg/exclamation/exclamation-mark-white.svg";
import { noAvatar } from "~/constants";

interface Props {
  battery: number;
  lineWidth: number;
  circleWidth: number;
  avatar: string;
  isInModal?: boolean;
  isBackgroundTransparent?: boolean;
  highlightOnEmergency?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Image = styled.Image<{ circleWidth?: number }>`
  ${({ circleWidth }) => css`
    width: ${circleWidth || 70}px;
    height: ${circleWidth || 70}px;
    border-radius: ${circleWidth || 35}px;
  `}
`;

const Alert = styled(Animated.View)<{ width: number }>`
  background-color: ${palette.red_f0_55};
  position: absolute;
  z-index: 1;
  justify-content: center;
  align-items: center;
  ${({ width }) => css`
    width: ${width}px;
    height: ${width}px;
    border-radius: ${width / 2}px;
  `}
`;

const AnimatedCircularProgress = ({
  battery,
  lineWidth,
  circleWidth,
  isBackgroundTransparent,
  avatar,
  isInModal = false,
  highlightOnEmergency = false,
  style,
}: Props) => {
  const batteryValue = battery || 0;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (highlightOnEmergency) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.3,
            useNativeDriver: true,
            duration: 400,
          }),
          Animated.timing(scale, {
            toValue: 1,
            useNativeDriver: true,
            duration: 400,
          }),
          Animated.delay(1000),
        ]),
      ).start();
    }
  }, [highlightOnEmergency]);

  return (
    <View style={style}>
      {highlightOnEmergency ? (
        <Alert style={{ transform: [{ scale }] }} width={circleWidth}>
          <Icon width={7} height={36} />
        </Alert>
      ) : null}
      <RNCircularProgress
        size={circleWidth}
        width={lineWidth}
        fill={batteryValue}
        prefill={batteryValue}
        tintColor={batteryValue > 25 ? palette.blue_85 : palette.red_f1}
        backgroundColor={
          isBackgroundTransparent
            ? "transparent"
            : battery > 25
            ? palette.blue_e5
            : palette.red_fc
        }
        lineCap="round"
        rotation={0}
        style={{
          ...(isInModal && {
            position: "absolute",
            top: -45,
            left: "50%",
            marginLeft: -45,
          }),
        }}>
        {() => (
          <Image
            resizeMode="cover"
            circleWidth={circleWidth - lineWidth}
            source={avatar ? { uri: avatar } : noAvatar}
          />
        )}
      </RNCircularProgress>
    </View>
  );
};

export default memo(AnimatedCircularProgress);
