import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { rpHeight, rpWidth, width } from "~/styles";
import palette from "~/styles/palette";
import { isAndroid } from "~/utils";

const Container = styled.View`
  width: ${width}px;
  padding: 0px ${rpWidth(26)}px;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  top: ${isAndroid ? `${rpHeight(754.2) - 807}px` : `${rpHeight(807) - 807}px`};
  right: 0;
  width: ${rpWidth(450)}px;
`;

const Phone = styled.Image`
  height: ${rpHeight(442)}px;
  margin-top: ${rpHeight(65)}px;
`;

const ThirdIntro = () => (
  <>
    <BackgroundImage
      source={require("~/assets/image/intro/background-wave.png")}
    />
    <Container>
      <MyText fontSize={24} style={{ color: palette.blue_6e }}>
        펫브리즈 반려동물 트래커를 통해
      </MyText>
      <MyText
        fontWeight="bold"
        fontSize={24}
        style={{ color: palette.blue_6e }}>
        말못하는 가족의 안전을 지켜주세요!
      </MyText>
      <Phone
        source={require("~/assets/image/intro/phone-mockup.png")}
        resizeMode="contain"
      />
    </Container>
  </>
);

export default ThirdIntro;
