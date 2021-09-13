import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import { useAppSelector } from "~/store";
import AnimatedPoints from "~/components/common/AnimatedPoints";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { Animated } from "react-native";
import palette from "~/styles/palette";
import { useDispatch } from "react-redux";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-white.svg";
import { FirmwareProgressScreenNavigationProp } from "~/types/navigator";

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
  width: ${rpWidth(268)}px;
  height: ${rpWidth(12)}px;
  border-radius: 100px;
  margin-bottom: ${rpWidth(42)}px;
  background-color: rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Bar = styled(Animated.View)`
  height: 100%;
  background-color: ${palette.blue_7b_90};
  border-radius: 100px;
`;

const FirmwareProgress = ({
  navigation,
}: {
  navigation: FirmwareProgressScreenNavigationProp;
}) => {
  const { status, progress } = useAppSelector(state => state.ble);
  const dispatch = useDispatch();
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
  const widthValue = useRef(new Animated.Value(progress)).current;

  const widthInterpolate = widthValue.interpolate({
    inputRange: [0, progress],
    outputRange: [`${0}%`, `${progress}%`],
  });

  const translateY = value1.interpolate({
    inputRange: [0, 1],
    outputRange: [-rpWidth(46), -rpWidth(23)],
  });

  useEffect(() => {
    Animated.timing(widthValue, {
      toValue: progress,
      useNativeDriver: false,
      duration: 400,
    }).start();
  }, [progress]);

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
          <Footprint width={rpWidth(60)} height={rpWidth(83)} />
        </Animated.View>
        <BarBackground>
          <Bar style={{ width: widthInterpolate }} />
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
