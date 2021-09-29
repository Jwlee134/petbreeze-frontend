import React, { useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import palette from "~/styles/palette";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { Animated, View } from "react-native";
import Icon from "~/assets/svg/exclamation/exclamation-mark-white.svg";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";

interface IProps {
  battery?: number;
  lineWidth?: number;
  circleWidth?: number;
  avatar: string;
  isInModal?: boolean;
  isBackgroundTransparent?: boolean;
  preventRpHeight?: boolean;
  highlightOnEmergency?: boolean;
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

const DeviceAvatarCircle = ({
  battery,
  lineWidth,
  circleWidth,
  isBackgroundTransparent,
  avatar,
  isInModal = false,
  preventRpHeight = false,
  highlightOnEmergency = false,
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const [value] = useAnimatedSequence({
    numOfValues: 1,
    loop: true,
    startAnimation: highlightOnEmergency,
    firstDuration: 400,
    resetDuration: 400,
    delayAfterFirst: 0,
    delayAfterReset: 1000,
  });

  const scale = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  return (
    <View>
      {highlightOnEmergency ? (
        <Alert
          style={{ transform: [{ scale }] }}
          width={rpWidth(circleWidth || 0)}>
          <Icon width={rpWidth(7)} height={rpWidth(36)} />
        </Alert>
      ) : null}
      {battery !== undefined && circleWidth && lineWidth ? (
        <AnimatedCircularProgress
          size={rpWidth(circleWidth)}
          width={lineWidth < 3 ? lineWidth : rpWidth(lineWidth)}
          fill={battery}
          prefill={battery}
          tintColor={
            battery > 25 ? `${palette.blue_7b}E6` : `${palette.red_f0}E6`
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
              source={require("~/assets/image/test.jpg")}
            />
          )}
        </AnimatedCircularProgress>
      ) : (
        <Image
          rpWidth={rpWidth}
          preventRpHeight={preventRpHeight}
          source={require("~/assets/image/test.jpg")}
        />
      )}
    </View>
  );
};

export default DeviceAvatarCircle;
