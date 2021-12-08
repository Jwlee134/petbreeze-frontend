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
import { DimensionsContext, RpHeight } from "~/context/DimensionsContext";

interface IconContainerProps {
  isLast?: boolean;
  rpHeight: RpHeight;
}

const IconContainer = styled.View<IconContainerProps>`
  ${({ rpHeight, isLast }) => css`
    margin-bottom: ${!isLast ? rpHeight(33) : 0}px;
    margin-left: 15px;
  `}
`;

const SvgContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Svg = styled.View`
  width: 67px;
`;

const SecondIntro = () => {
  const { top } = useSafeAreaInsets();
  const { rpHeight } = useContext(DimensionsContext);

  return (
    <IntroContainer rpHeight={rpHeight} topInset={top}>
      <View style={{ paddingHorizontal: 32 }}>
        <MyText fontWeight="light" fontSize={24}>
          반려동물 전용 트래커와
        </MyText>
        <MyText
          fontWeight="bold"
          fontSize={24}
          style={{ marginBottom: rpHeight(58) }}>
          ‘펫브리즈’ 가 함께라면?
        </MyText>
        <IconContainer rpHeight={rpHeight}>
          <SvgContainer>
            <Svg>
              <PhoneVibrate width={rpHeight(36)} height={rpHeight(39)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={rpHeight(18)}>
              안심존 이탈 알림
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={rpHeight(12)}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: 67 }}>
            반려동물이 지정된 안심구역을{"\n"}이탈할 시 알림을 전송해드립니다.
          </MyText>
        </IconContainer>
        <IconContainer rpHeight={rpHeight}>
          <SvgContainer>
            <Svg>
              <SharePeople width={rpHeight(34)} height={rpHeight(39)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={rpHeight(18)}>
              실종시 위치 간편공유
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={rpHeight(12)}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: 67 }}>
            위급 시 앱 설치 없이 링크를 통해{"\n"}간편하게 도움을 요청할 수
            있습니다.
          </MyText>
        </IconContainer>
        <IconContainer rpHeight={rpHeight}>
          <SvgContainer>
            <Svg>
              <FootpringPath width={rpHeight(37)} height={rpHeight(42)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={rpHeight(18)}>
              산책 자동기록 기능
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={rpHeight(12)}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: 67 }}>
            외출을 감지하여 산책시작 푸쉬알림을{"\n"}전송해드립니다.
          </MyText>
        </IconContainer>
        <IconContainer rpHeight={rpHeight}>
          <SvgContainer>
            <Svg>
              <ShareFamily width={rpHeight(30)} height={rpHeight(39)} />
            </Svg>
            <MyText fontWeight="medium" fontSize={rpHeight(18)}>
              가족 구성원간 공유
            </MyText>
          </SvgContainer>
          <MyText
            fontSize={rpHeight(12)}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginLeft: 67 }}>
            가족 구성원과 산책기록, 반려동물 위치{"\n"}등을 공유할 수 있습니다.
          </MyText>
        </IconContainer>
      </View>
    </IntroContainer>
  );
};

export default SecondIntro;
