import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";

import SharePeople from "~/assets/svg/intro/share-people.svg";
import ShareFamily from "~/assets/svg/intro/share-family.svg";
import FootpringPath from "~/assets/svg/intro/footprint-path.svg";
import PhoneVibrate from "~/assets/svg/intro/phone-vibrate.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IntroContainer } from "./styles";
import { View } from "react-native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const IconContainer = styled.View<{ isLast?: boolean; rpWidth: RpWidth }>`
  ${({ rpWidth, isLast }) => css`
    margin-bottom: ${!isLast ? rpWidth(33) : 0}px;
    margin-left: ${rpWidth(15)}px;
  `}
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  align-items: center;
`;

const Svg = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(67)}px;
`;

const SecondIntro = () => {
  const { top } = useSafeAreaInsets();
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <IntroContainer rpWidth={rpWidth} topInset={top}>
      <View style={{ paddingHorizontal: rpWidth(32) }}>
        <MyText fontWeight="light" fontSize={24}>
          반려동물 전용 트래커와
        </MyText>
        <MyText
          fontWeight="bold"
          fontSize={24}
          style={{ marginBottom: rpWidth(58) }}>
          ‘어디개’ 가 함께라면?
        </MyText>
        <IconContainer rpWidth={rpWidth}>
          <SvgContainer rpWidth={rpWidth}>
            <Svg rpWidth={rpWidth}>
              <PhoneVibrate width={rpWidth(36)} height={rpWidth(39)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={18}>
              안심존 이탈 알림
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={12}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: rpWidth(67) }}>
            반려동물이 지정된 안심구역을{"\n"}이탈할 시 알림을 전송해드립니다.
          </MyText>
        </IconContainer>
        <IconContainer rpWidth={rpWidth}>
          <SvgContainer rpWidth={rpWidth}>
            <Svg rpWidth={rpWidth}>
              <SharePeople width={rpWidth(34)} height={rpWidth(39)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={18}>
              실종시 위치 간편공유
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={12}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: rpWidth(67) }}>
            위급 시 앱 설치 없이 링크를 통해{"\n"}간편하게 도움을 요청할 수
            있습니다.
          </MyText>
        </IconContainer>
        <IconContainer rpWidth={rpWidth}>
          <SvgContainer rpWidth={rpWidth}>
            <Svg rpWidth={rpWidth}>
              <FootpringPath width={rpWidth(37)} height={rpWidth(42)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={18}>
              산책 자동기록 기능
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={12}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: rpWidth(67) }}>
            외출을 감지하여 산책시작 푸쉬알림을{"\n"}전송해드립니다.
          </MyText>
        </IconContainer>
        <IconContainer rpWidth={rpWidth}>
          <SvgContainer rpWidth={rpWidth}>
            <Svg rpWidth={rpWidth}>
              <ShareFamily width={rpWidth(30)} height={rpWidth(39)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={18}>
              가족 구성원간 공유
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={12}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: rpWidth(67) }}>
            가족 구성원과 산책기록, 반려동물 위치{"\n"}등을 공유할 수 있습니다.
          </MyText>
        </IconContainer>
      </View>
    </IntroContainer>
  );
};

export default SecondIntro;
