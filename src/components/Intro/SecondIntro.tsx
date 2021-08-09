import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { rpHeight, rpWidth, width } from "~/styles";

import SharePeople from "~/assets/svg/intro/share-people.svg";
import FootpringPath from "~/assets/svg/intro/footprint-path.svg";
import PhoneVibrate from "~/assets/svg/intro/phone-vibrate.svg";

const Container = styled.View`
  width: ${width}px;
  padding: 0px ${rpWidth(26)}px;
`;

const IconContainer = styled.View<{ isLast?: boolean }>`
  flex-direction: row;
  margin-left: ${rpWidth(21)}px;
  margin-bottom: ${({ isLast }) => (!isLast ? rpHeight(70) : 0)}px;
`;

const SvgContainer = styled.View`
  width: ${rpWidth(120)}px;
`;

const TextContainer = styled.View`
  justify-content: center;
`;

const SecondIntro = () => (
  <Container>
    <MyText fontSize={30}>펫브리즈</MyText>
    <MyText
      fontWeight="bold"
      fontSize={30}
      style={{ marginBottom: rpHeight(116) }}>
      트래커와 함께라면?
    </MyText>
    <IconContainer>
      <SvgContainer>
        <SharePeople width={rpWidth(67.21)} height={rpHeight(76.1)} />
      </SvgContainer>
      <TextContainer>
        <MyText
          fontWeight="medium"
          fontSize={18}
          style={{ marginBottom: rpHeight(10) }}>
          간편한 공유
        </MyText>
        <MyText fontSize={14} style={{ opacity: 0.7 }}>
          가족 구성원끼리 앱을 공유할 수 있어요
        </MyText>
      </TextContainer>
    </IconContainer>
    <IconContainer>
      <SvgContainer>
        <FootpringPath width={rpWidth(74.54)} height={rpHeight(74.7)} />
      </SvgContainer>
      <TextContainer>
        <MyText
          fontWeight="medium"
          fontSize={18}
          style={{ marginBottom: rpHeight(10) }}>
          위치 확인
        </MyText>
        <MyText fontSize={14} style={{ opacity: 0.7 }}>
          펫시팅 중 지정된 장소에 안전하게{"\n"}있는지 확인하세요
        </MyText>
      </TextContainer>
    </IconContainer>
    <IconContainer isLast>
      <SvgContainer>
        <PhoneVibrate width={rpWidth(67.22)} height={rpHeight(72.71)} />
      </SvgContainer>
      <TextContainer>
        <MyText
          fontWeight="medium"
          fontSize={18}
          style={{ marginBottom: rpHeight(10) }}>
          안심존 이탈 알림
        </MyText>
        <MyText fontSize={14} style={{ opacity: 0.7 }}>
          안심구역을 보호자 없이 이탈하면{"\n"}알림이 전송됩니다
        </MyText>
      </TextContainer>
    </IconContainer>
  </Container>
);

export default SecondIntro;
