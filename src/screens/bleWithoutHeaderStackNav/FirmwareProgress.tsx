import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import AnimatedPoints from "~/components/common/AnimatedPoints";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { Animated } from "react-native";
import palette from "~/styles/palette";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-white.svg";
import { FirmwareProgressScreenNavigationProp } from "~/types/navigator";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const barWidth = 268;

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
  width: ${barWidth}px;
  height: 12px;
  margin-bottom: 42px;
  border-radius: 100px;
  background-color: rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Bar = styled(Reanimated.View)`
  height: 100%;
  background-color: ${palette.blue_86};
  border-radius: 100px;
`;

const FirmwareProgress = ({
  navigation,
}: {
  navigation: FirmwareProgressScreenNavigationProp;
}) => {
  const { status, progress } = useAppSelector(state => state.ble);
  const [value1] = useAnimatedSequence({
    numOfValues: 1,
    loop: true,
    firstDuration: 400,
    delayAfterMount: 600,
    resetDuration: 400,
    delayAfterFirst: 800,
    delayAfterReset: 800,
  });
  const [point1, point2, point3] = useAnimatedSequence({
    numOfValues: 3,
    loop: true,
    delayAfterMount: 600,
    firstDuration: 400,
    delayAfterFirst: 800,
    secondDuration: 400,
    delayAfterSecond: 800,
    thirdDuration: 400,
    delayAfterThird: 800,
    resetDuration: 400,
    delayAfterReset: 800,
  });
  const percentage = useSharedValue(progress);

  const animatedStyles = useAnimatedStyle(() => {
    percentage.value = barWidth * (progress / 100);
    return { width: withTiming(percentage.value, { duration: 400 }) };
  }, [progress]);

  const translateY = value1.interpolate({
    inputRange: [0, 1],
    outputRange: [-46, -23],
  });

  useEffect(() => {
    if (status === "downloadingFail" || status === "installingFail")
      navigation.replace("Fail");
    if (status === "otaUpdateSuccess") navigation.replace("Success");
  }, [status]);

  return (
    <>
      <TopContainer>
        <Animated.View
          style={{
            opacity: value1,
            transform: [{ translateY }],
          }}>
          <Footprint width={60} height={83} />
        </Animated.View>
        <BarBackground>
          <Bar style={[animatedStyles]} />
        </BarBackground>
      </TopContainer>
      <BottomContainer>
        <AnimatedPoints
          value1={point1}
          value2={point2}
          value3={point3}
          text={
            status.includes("download") ? "펌웨어 다운로드중" : "펌웨어 설치중"
          }
          fontSize={24}
        />
      </BottomContainer>
    </>
  );
};

export default FirmwareProgress;
