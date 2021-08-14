import React from "react";
import styled from "styled-components/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";

interface IProps {
  battery: number;
  avatar: string;
  isInModal?: boolean;
  isWalk?: boolean;
}

const Image = styled.Image`
  width: ${rpWidth(76)}px;
  height: ${rpWidth(76)}px;
`;

const DeviceAvatarCircle = ({
  battery,
  avatar,
  isInModal = false,
  isWalk = false,
}: IProps) => (
  <AnimatedCircularProgress
    size={rpWidth(isWalk ? 70 : 90)}
    width={rpWidth(isWalk ? 3 : 7)}
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
    {() => <Image source={require("~/assets/image/test.jpg")} />}
  </AnimatedCircularProgress>
);

export default DeviceAvatarCircle;
