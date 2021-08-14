import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { storageActions } from "~/store/storage";
import { isTablet, rpHeight, rpWidth, width } from "~/styles";
import palette from "~/styles/palette";
import { isAndroid } from "~/utils";
import Button from "../common/Button";

const Container = styled.View`
  width: ${width}px;
  padding: 0px ${rpWidth(16)}px;
  justify-content: space-between;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  right: 0;
  width: ${width}px;
  height: ${rpHeight(isAndroid ? 543 : 577)}px;
`;

const Phone = styled.Image`
  width: ${rpWidth(491)}px;
  height: ${rpHeight(369)}px;
  position: absolute;
  top: ${rpHeight(92)}px;
  left: ${!isTablet ? 0 : "auto"};
  right: ${isTablet ? 0 : "auto"};
`;

const ThirdIntro = () => {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <BackgroundImage
        source={require("~/assets/image/intro/background-wave.png")}
        resizeMode="stretch"
      />
      <Container>
        <View style={{ marginLeft: rpWidth(10) }}>
          <MyText fontSize={18} color={palette.blue_6e}>
            펫브리즈 반려동물 트래커를 통해
          </MyText>
          <MyText fontWeight="bold" fontSize={18} color={palette.blue_6e}>
            말못하는 가족의 안전을 지켜주세요!
          </MyText>
        </View>
        <Phone
          source={require("~/assets/image/intro/phone-mockup.png")}
          resizeMode="contain"
        />
        <Button
          style={{
            marginBottom: rpHeight(94) + bottom,
          }}
          onPress={() => dispatch(storageActions.setInit("intro"))}>
          어디개와 함께하기
        </Button>
      </Container>
    </>
  );
};

export default ThirdIntro;
