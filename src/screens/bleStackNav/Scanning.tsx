import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import MyText from "~/components/common/MyText";
import Points from "~/components/common/Points";
import Footprint from "~/assets/svg/footprint/footprint-outline-blue.svg";
import { Animated, View } from "react-native";
import { rpWidth } from "~/styles";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const BottomContainer = styled.View`
  flex: 1;
`;

const FootPrintBorder = styled(Animated.View)`
  width: ${rpWidth(248)}px;
  height: ${rpWidth(248)}px;
  border-radius: ${rpWidth(124)}px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  border-color: rgba(255, 255, 255, 0.2);
  position: absolute;
`;

const FootPrintOuter = styled(Animated.View)`
  width: ${rpWidth(178)}px;
  height: ${rpWidth(178)}px;
  border-radius: ${rpWidth(89)}px;
  background-color: rgba(255, 255, 255, 0.1);
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const FootPrintInner = styled.View`
  background-color: white;
  width: ${rpWidth(98)}px;
  height: ${rpWidth(98)}px;
  border-radius: ${rpWidth(49)}px;
  justify-content: center;
  align-items: center;
`;

const Scanning = () => {
  const value = useRef(new Animated.Value(0)).current;
  const value2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(400),
        Animated.timing(value2, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(400),
        Animated.parallel([
          Animated.timing(value, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(value2, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(400),
      ]),
    ).start();
  }, []);

  return (
    <GradientContainer>
      <TopContainer>
        <View />
        <RowContainer>
          <MyText fontSize={24} fontWeight="medium" color="white">
            디바이스 검색중
          </MyText>
          <Points color="white" />
        </RowContainer>
        <FootPrintInner>
          <Footprint width={rpWidth(58)} height={rpWidth(56)} />
          <FootPrintBorder style={{ opacity: value2 }} />
          <FootPrintOuter style={{ opacity: value }} />
        </FootPrintInner>
      </TopContainer>
      <BottomContainer />
    </GradientContainer>
  );
};

export default Scanning;
