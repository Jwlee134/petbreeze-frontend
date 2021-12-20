import React, { useContext } from "react";
import Button from "~/components/common/Button";
import styled from "styled-components/native";

import Shield from "~/assets/svg/area/footprint-shield.svg";
import MyText from "~/components/common/MyText";
import { PreAreaScreenNavigationProp } from "~/types/navigator";
import { Animated } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import ParagraphWithCheckCircle from "~/components/common/ParagraphWithCheckCircle";
import { DimensionsContext } from "~/context/DimensionsContext";

const DescriptionContainer = styled(Animated.View)`
  width: 100%;
`;

const TopContainer = styled(Animated.View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const PreArea = ({
  navigation,
}: {
  navigation: PreAreaScreenNavigationProp;
}) => {
  const { rpHeight } = useContext(DimensionsContext);
  const [value1, value2] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterFirst: 300,
    secondDuration: 300,
  });

  const onNext = () => {
    navigation.navigate("BleWithoutHeaderStackNav", {
      initialRouteName: "Area",
    });
  };

  return (
    <>
      <TopContainer style={{ opacity: value1 }}>
        <Shield width={rpHeight(106)} height={rpHeight(112)} />
        <MyText
          fontSize={24}
          style={{
            textAlign: "center",
            marginTop: rpHeight(32),
            marginBottom: rpHeight(23),
          }}>
          안심존을{"\n"}설정해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer>
        <DescriptionContainer
          style={{ opacity: value2, marginTop: rpHeight(52) }}>
          <ParagraphWithCheckCircle isWhiteBackground>
            안심존 이탈 시 푸시알림을 보내드립니다.
          </ParagraphWithCheckCircle>
          <ParagraphWithCheckCircle isWhiteBackground>
            마이페이지에서 3개까지 설정할 수 있습니다.
          </ParagraphWithCheckCircle>
          <ParagraphWithCheckCircle isWhiteBackground>
            안심존에 연결할 WiFi를 등록해주세요.
          </ParagraphWithCheckCircle>
        </DescriptionContainer>
        <Button
          delay={1100}
          useCommonMarginBottom
          useBottomInset
          onPress={onNext}>
          다음
        </Button>
      </BottomContainer>
    </>
  );
};

export default PreArea;
