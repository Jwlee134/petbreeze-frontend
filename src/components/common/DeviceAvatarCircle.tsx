import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import palette from "~/styles/palette";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

interface IProps {
  battery?: number;
  lineWidth?: number;
  circleWidth?: number;
  avatar: string;
  isInModal?: boolean;
  isBackgroundTransparent?: boolean;
  preventRpHeight?: boolean;
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

const DeviceAvatarCircle = ({
  battery,
  lineWidth,
  circleWidth,
  isBackgroundTransparent,
  avatar,
  isInModal = false,
  preventRpHeight = false,
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);

  return battery !== undefined && circleWidth && lineWidth ? (
    <AnimatedCircularProgress
      size={rpWidth(circleWidth)}
      width={lineWidth < 3 ? lineWidth : rpWidth(lineWidth)}
      fill={battery}
      prefill={battery}
      tintColor={battery > 25 ? `${palette.blue_7b}E6` : `${palette.red_f0}E6`}
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
  );
};

export default DeviceAvatarCircle;
