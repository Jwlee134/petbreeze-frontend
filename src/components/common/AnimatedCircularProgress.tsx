import React, { memo, useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components/native";
import { AnimatedCircularProgress as RNCircularProgress } from "react-native-circular-progress";
import palette from "~/styles/palette";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import Icon from "~/assets/svg/exclamation/exclamation-mark-white.svg";
import { noAvatar } from "~/constants";

interface IProps {
  battery: number;
  lineWidth: number;
  circleWidth: number;
  avatar: string;
  isInModal?: boolean;
  isBackgroundTransparent?: boolean;
  preventRpHeight?: boolean;
  highlightOnEmergency?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface Image {
  circleWidth?: number;
  preventRpHeight: boolean;
  rpWidth: RpWidth;
}

const Image = styled.Image<Image>`
  ${({ circleWidth, preventRpHeight, rpWidth }) => css`
    width: ${circleWidth
      ? rpWidth(circleWidth)
      : rpWidth(70, preventRpHeight)}px;
    height: ${circleWidth
      ? rpWidth(circleWidth)
      : rpWidth(70, preventRpHeight)}px;
    border-radius: ${circleWidth
      ? rpWidth(circleWidth)
      : rpWidth(35, preventRpHeight)}px;
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
  preventRpHeight = false,
  highlightOnEmergency = false,
  style,
}: IProps) => {
  const batteryValue = battery || 0;
  const { rpWidth } = useContext(DimensionsContext);
  const value = useRef(new Animated.Value(0)).current;

  const scale = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  useEffect(() => {
    if (highlightOnEmergency) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            useNativeDriver: true,
            duration: 400,
          }),
          Animated.timing(value, {
            toValue: 0,
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
        <Alert
          style={{ transform: [{ scale }] }}
          width={rpWidth(circleWidth || 0)}>
          <Icon width={rpWidth(7)} height={rpWidth(36)} />
        </Alert>
      ) : null}
      <RNCircularProgress
        size={rpWidth(circleWidth)}
        width={lineWidth < 3 ? lineWidth : rpWidth(lineWidth)}
        fill={batteryValue}
        prefill={batteryValue}
        tintColor={
          batteryValue > 25 ? `${palette.blue_7b}E6` : `${palette.red_f0}E6`
        }
        backgroundColor={
          isBackgroundTransparent
            ? "transparent"
            : battery > 25
            ? `${palette.blue_7b}33`
            : `${palette.red_f0}33`
        }
        lineCap="round"
        rotation={0}
        style={{
          ...(isInModal && {
            position: "absolute",
            top: -rpWidth(45),
            left: "50%",
            marginLeft: -rpWidth(45),
          }),
        }}>
        {() => (
          <Image
            rpWidth={rpWidth}
            preventRpHeight={preventRpHeight}
            circleWidth={circleWidth - lineWidth}
            source={avatar ? { uri: avatar } : noAvatar}
          />
        )}
      </RNCircularProgress>
    </View>
  );
};

export default memo(AnimatedCircularProgress);
