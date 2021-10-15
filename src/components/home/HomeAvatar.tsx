import React, { memo, useContext } from "react";
import { Animated, ViewStyle } from "react-native";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { commonActions } from "~/store/common";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";

interface IProps {
  index: number;
  length: number;
  onAvatarLongPress: (id: string) => void;
  style?: Animated.AnimatedProps<ViewStyle>;
}

interface IPressable {
  index?: number;
  length?: number;
  rpWidth: RpWidth;
}

const Pressable = styled.Pressable<IPressable>`
  position: absolute;
  bottom: ${({ rpWidth }) => rpWidth(40)}px;
  ${({ index, length, rpWidth }) => {
    switch (length) {
      case 1:
        return css`
          align-self: center;
        `;
      case 2:
        return css`
          margin-left: -${rpWidth(45)}px;
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
          margin: 0px ${rpWidth(10)}px;
        `;
    }
  }}
`;

const HomeAvatar = ({
  device,
  length,
  index,
  onAvatarLongPress,
  style,
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const dispatch = useDispatch();

  return (
    <Animated.View style={style}>
      <Pressable
        onLongPress={() => onAvatarLongPress(device.id)}
        rpWidth={rpWidth}
        length={length}
        index={index}
        onPress={() => {
          dispatch(commonActions.setIsDeviceMoved(false));
          dispatch(
            commonActions.setDeviceCoord({
              latitude: device.latitude,
              longitude: device.longitude,
            }),
          );
        }}>
        <AnimatedCircularProgress
          preventRpHeight
          circleWidth={length > 2 ? 70 : 90}
          lineWidth={length > 2 ? 5 : 7}
          battery={device.battery}
          highlightOnEmergency={device.emergency}
        />
      </Pressable>
    </Animated.View>
  );
};

export default memo(HomeAvatar);
