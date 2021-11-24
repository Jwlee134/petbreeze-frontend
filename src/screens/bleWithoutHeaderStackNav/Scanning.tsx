import React, { useEffect } from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import AnimatedPoints from "~/components/common/AnimatedPoints";
import Footprint from "~/assets/svg/footprint/footprint-blue.svg";
import { Animated } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { ScanningScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  flex: 1;
`;

const FootPrintBorder = styled(Animated.View)`
  width: 248px;
  height: 248px;
  border-radius: 124px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  border-color: rgba(255, 255, 255, 0.2);
  position: absolute;
`;

const FootPrintOuter = styled(Animated.View)`
  width: 178px;
  height: 178px;
  border-radius: 89px;
  background-color: rgba(255, 255, 255, 0.1);
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const FootPrintInner = styled.View`
  width: 98px;
  height: 98px;
  border-radius: 49px;
  margin-bottom: -20px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Scanning = ({
  navigation,
}: {
  navigation: ScanningScreenNavigationProp;
}) => {
  const { top } = useSafeAreaInsets();
  const status = useAppSelector(state => state.ble.status);
  const [value1, value2] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterMount: 400,
    delayAfterFirst: 400,
    delayAfterSecond: 400,
    loop: true,
    delayAfterReset: 400,
  });

  useEffect(() => {
    if (status === "scanningFail" || status === "connectingFail")
      navigation.replace("ScanningFail");
    if (status === "connected") navigation.replace("Success");
  }, [status]);

  return (
    <GradientContainer>
      <TopContainer>
        <AnimatedPoints
          fontWeight="medium"
          fontSize={24}
          value2={value1}
          value3={value2}
          color="white"
          text="디바이스 검색중"
          style={{
            marginTop: top + 99,
          }}
        />
        <FootPrintInner>
          <Footprint width={58} height={56} />
          <FootPrintBorder style={{ opacity: value2 }} />
          <FootPrintOuter style={{ opacity: value1 }} />
        </FootPrintInner>
      </TopContainer>
      <BottomContainer />
    </GradientContainer>
  );
};

export default Scanning;
