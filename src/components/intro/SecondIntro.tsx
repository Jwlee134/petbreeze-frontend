import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";

import SharePeople from "~/assets/svg/intro/share-people.svg";
import FootpringPath from "~/assets/svg/intro/footprint-path.svg";
import PhoneVibrate from "~/assets/svg/intro/phone-vibrate.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IntroContainer } from "./styles";
import { View } from "react-native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const IconContainer = styled.View<{ isLast?: boolean; rpWidth: RpWidth }>`
  flex-direction: row;
  ${({ rpWidth, isLast }) => css`
    margin-left: ${rpWidth(13)}px;
    margin-bottom: ${!isLast ? rpWidth(52) : 0}px;
  `}
  align-items: center;
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(110)}px;
`;

const TextContainer = styled.View`
  justify-content: center;
`;

const SecondIntro = () => {
  const { top } = useSafeAreaInsets();
  const { rpHeight, rpWidth } = useContext(DimensionsContext);

  return (
    <IntroContainer rpWidth={rpWidth} topInset={top}>
      <View style={{ paddingHorizontal: rpWidth(22) }}>
        <MyText fontSize={24}>펫브리즈</MyText>
        <MyText
          fontWeight="bold"
          fontSize={24}
          style={{ marginBottom: rpWidth(91) }}>
          트래커와 함께라면?
        </MyText>
        <IconContainer rpWidth={rpWidth}>
          <SvgContainer rpWidth={rpWidth}>
            <SharePeople width={rpWidth(55)} height={rpWidth(63)} />
          </SvgContainer>
          <TextContainer>
            <MyText
              fontWeight="medium"
              fontSize={18}
              style={{ marginBottom: rpWidth(7) }}>
              간편한 공유
            </MyText>
            <MyText fontSize={14} style={{ opacity: 0.7 }}>
              가족 구성원끼리 앱을 공유하고{"\n"}함께 관리할 수 있어요.
            </MyText>
          </TextContainer>
        </IconContainer>
        <IconContainer rpWidth={rpWidth}>
          <SvgContainer rpWidth={rpWidth}>
            <FootpringPath width={rpWidth(62)} height={rpWidth(62)} />
          </SvgContainer>
          <TextContainer>
            <MyText
              fontWeight="medium"
              fontSize={18}
              style={{ marginBottom: rpWidth(7) }}>
              위치 확인
            </MyText>
            <MyText fontSize={14} style={{ opacity: 0.7 }}>
              반려견이 펫시팅 중 지정된 장소에{"\n"}안전하게 있는지 확인하세요.
            </MyText>
          </TextContainer>
        </IconContainer>
        <IconContainer rpWidth={rpWidth} isLast>
          <SvgContainer rpWidth={rpWidth}>
            <PhoneVibrate width={rpWidth(56)} height={rpWidth(60)} />
          </SvgContainer>
          <TextContainer>
            <MyText
              fontWeight="medium"
              fontSize={18}
              style={{ marginBottom: rpHeight(7) }}>
              안심존 이탈 알림
            </MyText>
            <MyText fontSize={14} style={{ opacity: 0.7 }}>
              반려견이 안심구역을 보호자 없이{"\n"}이탈하면 알림이 전송됩니다.
            </MyText>
          </TextContainer>
        </IconContainer>
      </View>
    </IntroContainer>
  );
};

export default SecondIntro;
