import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import { FirmwareProgressScreenNavigationProp } from "~/types/navigator";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MyText from "~/components/common/MyText";
import GradientContainer from "~/components/common/container/GradientContainer";
import { DimensionsContext } from "~/context/DimensionsContext";
import { View } from "react-native";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const BarBackground = styled.View`
  height: 7px;
  background-color: white;
  overflow: hidden;
`;

const Bar = styled(Animated.View)`
  height: 100%;
  background-color: #d7adff;
`;

const FirmwareProgress = ({
  navigation,
}: {
  navigation: FirmwareProgressScreenNavigationProp;
}) => {
  const { width, rpHeight } = useContext(DimensionsContext);
  const { status, progress } = useAppSelector(state => state.ble);
  const percentage = useSharedValue(progress);
  const translateX = useSharedValue(progress);

  const barWidth = width - 64;

  const animatedStyles = useAnimatedStyle(() => {
    percentage.value = barWidth * (progress / 100);
    return { width: withTiming(percentage.value, { duration: 400 }) };
  }, [progress]);
  const markerAnimatedStyles = useAnimatedStyle(() => {
    translateX.value = barWidth * (progress / 100);
    return {
      transform: [
        { translateX: withTiming(translateX.value, { duration: 400 }) },
      ],
    };
  }, [progress]);

  useEffect(() => {
    if (status === "downloadingFail" || status === "installingFail")
      navigation.replace("Fail");
    if (status === "otaUpdateSuccess") navigation.replace("Success");
  }, [status]);

  return (
    <GradientContainer>
      <TopContainer>
        <View style={{ width: barWidth + 35 }}>
          <Animated.View style={[markerAnimatedStyles]}>
            <Footprint width={35} height={48} style={{ marginBottom: 15 }} />
          </Animated.View>
        </View>
        <BarBackground style={{ width: barWidth, marginBottom: rpHeight(90) }}>
          <Bar style={[animatedStyles]} />
        </BarBackground>
        <MyText fontWeight="medium" fontSize={24} color="white">
          {status.includes("download") ? "펌웨어 다운로드중" : "펌웨어 설치중"}
        </MyText>
      </TopContainer>
      <BottomContainer />
    </GradientContainer>
  );
};

export default FirmwareProgress;
