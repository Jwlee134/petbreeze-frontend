import React from "react";
import styled from "styled-components/native";
import Loading1 from "~/assets/svg/loading/loading1.svg";
import Loading2 from "~/assets/svg/loading/loading2.svg";
import Loading3 from "~/assets/svg/loading/loading3.svg";
import Marker from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import GradientContainer from "~/components/common/container/GradientContainer";
import { Animated } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import AnimatedPoints from "~/components/common/AnimatedPoints";

const Container = styled.View`
  margin-bottom: 40px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  align-self: center;
  bottom: 6px;
`;

const LoadingView = styled(Animated.View)`
  position: absolute;
  align-self: center;
`;

const RowContainer = styled.View`
  flex-direction: row;
  margin-top: 80px;
`;

const Loading = ({ loadingText }: { loadingText: string }) => {
  const [value1, value2, value3] = useAnimatedSequence({
    loop: true,
    numOfValues: 3,
  });

  return (
    <GradientContainer
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Container>
        <Marker width={63} height={83} />
        <LoadingContainer>
          <LoadingView style={{ opacity: value1 }}>
            <Loading1 width={134} height={32} />
          </LoadingView>
          <LoadingView style={{ top: -5, opacity: value2 }}>
            <Loading2 width={195} height={51} />
          </LoadingView>
          <LoadingView style={{ top: -10, opacity: value3 }}>
            <Loading3 width={251} height={71} />
          </LoadingView>
        </LoadingContainer>
      </Container>
      <RowContainer>
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
