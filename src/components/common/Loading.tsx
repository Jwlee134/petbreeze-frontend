import React, { useContext } from "react";
import styled from "styled-components/native";
import Loading1 from "~/assets/svg/loading/loading1.svg";
import Loading2 from "~/assets/svg/loading/loading2.svg";
import Loading3 from "~/assets/svg/loading/loading3.svg";
import Marker from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import GradientContainer from "~/components/common/container/GradientContainer";
import { Animated, View } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import MyText from "./MyText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DimensionsContext } from "~/context/DimensionsContext";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const LoadingContainer = styled.View``;

const LoadingView = styled(Animated.View)`
  position: absolute;
  align-self: center;
`;

const Loading = ({ loadingText }: { loadingText: string }) => {
  const { top } = useSafeAreaInsets();
  const [value1, value2, value3] = useAnimatedSequence({
    loop: true,
    numOfValues: 3,
  });
  const { rpHeight } = useContext(DimensionsContext);

  return (
    <GradientContainer>
      <TopContainer>
        <View>
          <Marker style={{ marginTop: top }} />
          <LoadingContainer style={{ marginBottom: rpHeight(121) }}>
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
        </View>
        <MyText
          fontWeight="medium"
          style={{ textAlign: "center" }}
          fontSize={24}
          color="white">
          {loadingText}
        </MyText>
      </TopContainer>
      <View style={{ flex: 1 }} />
    </GradientContainer>
  );
};

export default Loading;
