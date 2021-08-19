import React from "react";
import styled from "styled-components/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";

interface IProps {
  battery?: number;
  lineWidth?: number;
  circleWidth?: number;
  imageWidth?: number;
  avatar: string;
  isInModal?: boolean;
  isWalk?: boolean;
}

const Image = styled.Image<{ circleWidth?: number }>`
  width: ${({ circleWidth }) =>
    circleWidth ? rpWidth(circleWidth) : rpWidth(70)}px;
  height: ${({ circleWidth }) =>
    circleWidth ? rpWidth(circleWidth) : rpWidth(70)}px;
  border-radius: ${({ circleWidth }) =>
    circleWidth ? rpWidth(circleWidth) : rpWidth(35)}px;
`;

const DeviceAvatarCircle = ({
  battery,
  lineWidth,
  circleWidth,
  avatar,
  isInModal = false,
  isWalk = false,
}: IProps) =>
  battery !== undefined && circleWidth && lineWidth ? (
    <AnimatedCircularProgress
      size={rpWidth(circleWidth)}
      width={rpWidth(lineWidth)}
      fill={battery}
      prefill={battery}
      tintColor={battery > 25 ? `${palette.blue_7b}E6` : `${palette.red_f0}E6`}
      backgroundColor={
        isWalk
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
          circleWidth={circleWidth - lineWidth}
          source={require("~/assets/image/test.jpg")}
        />
      )}
    </AnimatedCircularProgress>
  ) : (
    <Image source={require("~/assets/image/test.jpg")} />
  );

export default DeviceAvatarCircle;
