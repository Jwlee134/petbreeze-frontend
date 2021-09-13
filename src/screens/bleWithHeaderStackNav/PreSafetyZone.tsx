import React from "react";
import Button from "~/components/common/Button";
import styled from "styled-components/native";

import Shield from "~/assets/svg/safetyZone/footprint-shield.svg";
import CheckCircle from "~/assets/svg/check/check-circle-black50.svg";
import { rpHeight, rpWidth } from "~/styles";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { PreSafetyZoneScreenNavigationProp } from "~/types/navigator";
import { Animated } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { useDispatch } from "react-redux";
import { navigatorActions } from "~/store/navigator";

const DescriptionContainer = styled(Animated.View)`
  width: 100%;
`;

const TopContainer = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Description = styled.View`
  background-color: white;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${rpWidth(32)}px;
  margin-left: ${rpWidth(40)}px;
`;

const PreSafetyZone = ({
  navigation,
}: {
  navigation: PreSafetyZoneScreenNavigationProp;
}) => {
  const [value1, value2] = useAnimatedSequence({
    numOfValues: 2,
    secondDuration: 300,
  });
  const dispatch = useDispatch();

  return (
    <SafeAreaContainer>
      <TopContainer style={{ opacity: value1 }}>
        <Shield width={rpWidth(106)} height={rpWidth(112)} />
        <MyText
          fontSize={24}
          color="rgba(0, 0, 0, 0.8)"
          style={{ textAlign: "center", marginTop: rpHeight(32) }}>
          안심존을{"\n"}설정해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer>
        <DescriptionContainer style={{ opacity: value2 }}>
          <Description>
            <CheckCircle
              width={rpWidth(24)}
              height={rpWidth(24)}
              style={{ marginRight: rpWidth(23) }}
            />
            <MyText fontSize={14} fontWeight="light">
              안심존 이탈 시 푸시알림을 보내드립니다.
            </MyText>
          </Description>
          <Description>
            <CheckCircle
              width={rpWidth(24)}
              height={rpWidth(24)}
              style={{ marginRight: rpWidth(23) }}
            />
            <MyText fontSize={14} fontWeight="light">
              실내 및 지하에서는 오차가 있을 수 있습니다.
            </MyText>
          </Description>
          <Description>
            <CheckCircle
              width={rpWidth(24)}
              height={rpWidth(24)}
              style={{ marginRight: rpWidth(23) }}
            />
            <MyText fontSize={14} fontWeight="light">
              마이페이지에서 3개까지 설정할 수 있습니다.
            </MyText>
          </Description>
        </DescriptionContainer>
        <Button
          delay={1300}
          useCommonMarginBottom
          onPress={() => {
            dispatch(
              navigatorActions.setInitialRoute({
                initialBleWithoutHeaderStackNavRouteName: "SafetyZone",
              }),
            );
            navigation.replace("BleWithoutHeaderStackNav");
          }}>
          다음
        </Button>
      </BottomContainer>
    </SafeAreaContainer>
  );
};

export default PreSafetyZone;
