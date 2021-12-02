import React, { memo } from "react";
import { Animated, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";
import { Device } from "~/api/device";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";

interface Props {
  index: number;
  length: number;
  onAvatarPress: (id: number) => void;
  onAvatarLongPress: (id: number) => void;
  style?: Animated.AnimatedProps<ViewStyle>;
  device: Device;
}

interface PressableProps {
  index?: number;
  length?: number;
}

const Pressable = styled.Pressable<PressableProps>`
  position: absolute;
  bottom: 34px;
  ${({ index, length }) => {
    switch (length) {
      case 1:
        return css`
          align-self: center;
        `;
      case 2:
        return css`
          margin-left: -45px;
          ${index === 0 ? { left: "33%" } : { left: "66%" }}
        `;
      case 3:
        return css`
          align-self: center;
          ${index === 0
            ? { left: "15%" }
            : index === 1
            ? {}
            : { right: "15%" }};
        `;
      default:
        return css`
          position: relative;
          bottom: 0;
          margin: 0px 10px;
        `;
    }
  }}
`;

const HomeAvatar = ({
  device,
  length,
  index,
  onAvatarPress,
  onAvatarLongPress,
  style,
}: Props) => (
  <Pressable
    onPress={() => onAvatarPress(device.id)}
    onLongPress={() => onAvatarLongPress(device.id)}
    length={length}
    index={index}>
    <Animated.View style={style}>
      <AnimatedCircularProgress
        avatar={device.profile_image}
        circleWidth={length > 2 ? 70 : 90}
        lineWidth={length > 2 ? 2.5 : 3.5}
        battery={device.battery}
        highlightOnEmergency={device.is_missed}
      />
    </Animated.View>
  </Pressable>
);

export default memo(HomeAvatar);
