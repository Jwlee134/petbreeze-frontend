import React, { memo } from "react";
import styled, { css } from "styled-components/native";
import { AnimatedCircularProgress as RNCircularProgress } from "react-native-circular-progress";
import palette from "~/styles/palette";
import { StyleProp, View, ViewStyle } from "react-native";

import { DEFAULT_AVATAR } from "~/constants";

interface Props {
  battery: number;
  lineWidth: number;
  circleWidth: number;
  avatar: string;
  isInModal?: boolean;
  isBackgroundTransparent?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Image = styled.Image<{ circleWidth?: number }>`
  ${({ circleWidth }) => css`
    width: ${circleWidth || 70}px;
    height: ${circleWidth || 70}px;
    border-radius: ${circleWidth || 35}px;
  `}
`;

const AnimatedCircularProgress = ({
  battery,
  lineWidth,
  circleWidth,
  isBackgroundTransparent,
  avatar,
  isInModal = false,
  style,
}: Props) => {
  const batteryValue = battery || 0;

  return (
    <View style={style}>
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
            source={avatar ? { uri: avatar } : DEFAULT_AVATAR}
          />
        )}
      </RNCircularProgress>
    </View>
  );
};

export default memo(AnimatedCircularProgress);
