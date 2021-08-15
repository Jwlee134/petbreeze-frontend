import React, { useRef } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import { rpHeight, rpWidth, width } from "~/styles";
import palette from "~/styles/palette";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Footprint from "~/assets/svg/common/footprint-outline.svg";

const Container = styled.View`
  flex: 1;
  width: ${width}px;
  justify-content: center;
  align-items: center;
`;

const FirmwareDownloading = ({ progress }: { progress: number }) => {
  return (
    <Container>
      <AnimatedCircularProgress
        size={rpWidth(144)}
        width={rpWidth(5)}
        lineCap="round"
        rotation={0}
        fill={progress}
        tintColor={palette.blue_7b}>
        {() => <Footprint width={rpWidth(73)} height={rpHeight(70)} />}
      </AnimatedCircularProgress>
    </Container>
  );
};

export default FirmwareDownloading;
