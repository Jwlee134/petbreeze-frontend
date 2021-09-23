import React, { useContext } from "react";
import styled from "styled-components/native";
import Loading1 from "~/assets/svg/loading/loading1.svg";
import Loading2 from "~/assets/svg/loading/loading2.svg";
import Loading3 from "~/assets/svg/loading/loading3.svg";
import Marker from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import GradientContainer from "~/components/common/container/GradientContainer";
import { Animated } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import AnimatedPoints from "~/components/common/AnimatedPoints";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const Container = styled.View<{ rpWidth: RpWidth }>`
  margin-bottom: ${({ rpWidth }) => rpWidth(40)}px;
`;

const LoadingContainer = styled.View<{ rpWidth: RpWidth }>`
  position: absolute;
  align-self: center;
  bottom: ${({ rpWidth }) => rpWidth(6)}px;
`;

const LoadingView = styled(Animated.View)`
  position: absolute;
  align-self: center;
`;

const RowContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  margin-top: ${({ rpWidth }) => rpWidth(80)}px;
`;

const Loading = ({ loadingText }: { loadingText: string }) => {
  const [value1, value2, value3] = useAnimatedSequence({
    loop: true,
    numOfValues: 3,
  });
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <GradientContainer
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Container rpWidth={rpWidth}>
        <Marker width={rpWidth(63)} height={rpWidth(83)} />
        <LoadingContainer rpWidth={rpWidth}>
          <LoadingView style={{ opacity: value1 }}>
            <Loading1 width={rpWidth(134)} height={rpWidth(32)} />
          </LoadingView>
          <LoadingView style={{ top: -rpWidth(5), opacity: value2 }}>
            <Loading2 width={rpWidth(195)} height={rpWidth(51)} />
          </LoadingView>
          <LoadingView style={{ top: -rpWidth(10), opacity: value3 }}>
            <Loading3 width={rpWidth(251)} height={rpWidth(71)} />
          </LoadingView>
        </LoadingContainer>
      </Container>
      <RowContainer rpWidth={rpWidth}>
        <AnimatedPoints
          color="white"
          value1={value1}
          value2={value2}
          value3={value3}
          fontSize={20}
          text={loadingText}
        />
      </RowContainer>
    </GradientContainer>
  );
};

export default Loading;
