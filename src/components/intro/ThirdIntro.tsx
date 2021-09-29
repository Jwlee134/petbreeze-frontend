import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";
import { IntroScreenNavigationProp } from "~/types/navigator";
import Button from "../common/Button";
import { IntroContainer } from "./styles";

const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image<{ rpWidth: RpWidth; isTablet: boolean }>`
  max-width: ${({ rpWidth, isTablet }) =>
    isTablet ? `${rpWidth(320)}px` : "90%"};
  width: 100%;
`;

const ThirdIntro = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();
  const dispatch = useDispatch();
  const { top, bottom } = useSafeAreaInsets();
  const { isTablet, rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <IntroContainer rpWidth={rpWidth} topInset={top} spaceBetween>
        <View style={{ marginLeft: rpWidth(32) }}>
          <MyText fontWeight="light" fontSize={24} color={palette.blue_7b_80}>
            펫브리즈와 함께
          </MyText>
          <MyText fontWeight="bold" fontSize={24} color={palette.blue_7b_80}>
            확실하게 안전을 챙기세요!
          </MyText>
        </View>
        <ImageContainer>
          <Image
            isTablet={isTablet}
            source={require("~/assets/image/intro/phone.png")}
            rpWidth={rpWidth}
            resizeMode="contain"
            fadeDuration={0}
          />
        </ImageContainer>
        <Button
          backgroundColor="white"
          fontColor={palette.blue_7b}
          style={{
            marginBottom: rpWidth(94) + bottom,
            borderWidth: 2,
            borderColor: palette.blue_7b_90,
          }}
          onPress={() => {
            navigation.replace("Start");
            /* dispatch(
              storageActions.setInit({
                isIntroPassed: true,
              }),
            ); */
          }}>
          시작하기
        </Button>
      </IntroContainer>
    </>
  );
};

export default ThirdIntro;
