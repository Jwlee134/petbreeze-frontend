import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { rpHeight, rpWidth, width } from "~/styles";

import SharePeople from "~/assets/svg/intro/share-people.svg";
import FootpringPath from "~/assets/svg/intro/footprint-path.svg";
import PhoneVibrate from "~/assets/svg/intro/phone-vibrate.svg";

const Container = styled.View`
  width: ${width}px;
  padding: 0px ${rpWidth(22)}px;
`;

const IconContainer = styled.View<{ isLast?: boolean }>`
  flex-direction: row;
  margin-left: ${rpWidth(13)}px;
  margin-bottom: ${({ isLast }) => (!isLast ? rpHeight(52) : 0)}px;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: ${rpWidth(110)}px;
`;

const TextContainer = styled.View`
  justify-content: center;
`;

const SecondIntro = () => (
  <Container>
    <MyText fontSize={24}>펫브리즈</MyText>
    <MyText
      fontWeight="bold"
      fontSize={24}
      style={{ marginBottom: rpHeight(91) }}>
      트래커와 함께라면?
    </MyText>
    <IconContainer>
      <SvgContainer>
        <SharePeople width={rpWidth(55)} height={rpHeight(63)} />
      </SvgContainer>
      <TextContainer>
        <MyText
          fontWeight="medium"
          fontSize={18}
          style={{ marginBottom: rpHeight(7) }}>
          간편한 공유
        </MyText>
        <MyText fontSize={14} style={{ opacity: 0.7 }}>
          가족 구성원끼리 앱을 공유하고{"\n"}함께 관리할 수 있어요.
        </MyText>
      </TextContainer>
    </IconContainer>
    <IconContainer>
      <SvgContainer>
        <FootpringPath width={rpWidth(62)} height={rpHeight(62)} />
      </SvgContainer>
      <TextContainer>
        <MyText
          fontWeight="medium"
          fontSize={18}
          style={{ marginBottom: rpHeight(7) }}>
          위치 확인
        </MyText>
        <MyText fontSize={14} style={{ opacity: 0.7 }}>
          반려견이 펫시팅 중 지정된 장소에{"\n"}안전하게 있는지 확인하세요.
        </MyText>
      </TextContainer>
    </IconContainer>
    <IconContainer isLast>
      <SvgContainer>
        <PhoneVibrate width={rpWidth(56)} height={rpHeight(60.43)} />
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
  </Container>
);

export default SecondIntro;
