import React, { memo, useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled, { css } from "styled-components/native";
import { Device } from "~/api/device";
import palette from "~/styles/palette";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import MyText from "../common/MyText";
import Icon from "~/assets/svg/exclamation/exclamation-mark-white.svg";

interface Props {
  index: number;
  length: number;
  onAvatarPress: (id: number) => void;
  onAvatarLongPress: (id: number) => void;
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
          left: ${index === 0 ? "33%" : "66%"};
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

const LiveTextContainer = styled.View<{ isMissed: boolean }>`
  width: 36px;
  height: 20px;
  border-radius: 9.5px;
  background-color: ${({ isMissed }) =>
    isMissed ? palette.red_f2 : palette.blue_86};
  position: absolute;
  z-index: 100;
  justify-content: center;
  align-items: center;
  top: 5px;
  right: -3.8px;
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

const HomeAvatar = ({
  device,
  length,
  index,
  onAvatarPress,
  onAvatarLongPress,
}: Props) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (device.is_missed) {
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
  }, [device.is_missed]);

  return (
    <Pressable
      onPress={() => onAvatarPress(device.id)}
      onLongPress={() => onAvatarLongPress(device.id)}
      length={length}
      index={index}>
      {device.is_missed ? (
        <Alert style={{ transform: [{ scale }] }} width={length > 2 ? 70 : 90}>
          <Icon width={7} height={36} />
        </Alert>
      ) : null}
      {device.collection_period === 1 ? (
        <LiveTextContainer isMissed={device.is_missed}>
          <MyText color="white" fontWeight="bold" fontSize={12}>
            Live
          </MyText>
        </LiveTextContainer>
      ) : null}
      <AnimatedCircularProgress
        avatar={device.profile_image}
        circleWidth={length > 2 ? 70 : 90}
        lineWidth={length > 2 ? 2.5 : 3.5}
        battery={device.battery}
      />
    </Pressable>
  );
};

export default memo(HomeAvatar);
