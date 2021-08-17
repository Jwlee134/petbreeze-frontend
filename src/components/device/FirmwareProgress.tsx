import React from "react";
import styled from "styled-components/native";
import { rpHeight, rpWidth, width } from "~/styles";
import palette from "~/styles/palette";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Footprint from "~/assets/svg/common/footprint-outline.svg";
import MyText from "../common/MyText";
import Points from "./Points";

const Container = styled.View`
  flex: 1;
  width: ${width}px;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const FirmwareProgress = ({
  progress,
  title,
}: {
  progress: number;
  title: string;
}) => {
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
      <RowContainer>
        <MyText fontSize={24} fontWeight="medium">
          {title}
        </MyText>
        <Points />
      </RowContainer>
    </Container>
  );
};

export default React.memo(FirmwareProgress);
