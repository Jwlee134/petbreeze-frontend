import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { DimensionsContext } from "~/context/DimensionsContext";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";
import { IntroScreenNavigationProp } from "~/types/navigator";
import { isAndroid } from "~/utils";
import Button from "../common/Button";
import { IntroContainer } from "./styles";

const BackgroundImage = styled.Image`
  position: absolute;
  right: 0;
  width: 100%;
`;

const Phone = styled.Image`
  position: absolute;
`;

const ThirdIntro = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();
  const dispatch = useDispatch();
  const { top, bottom } = useSafeAreaInsets();
  const { isTablet, rpHeight, rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <BackgroundImage
        style={{
          height: rpHeight(isAndroid ? 543 : 577),
        }}
        source={require("~/assets/image/intro/background-wave.png")}
        resizeMode="stretch"
      />
      <IntroContainer rpWidth={rpWidth} topInset={top} spaceBetween>
        <View style={{ marginLeft: rpWidth(25) }}>
          <MyText fontSize={18} color={palette.blue_7b}>
            펫브리즈 반려동물 트래커를 통해
          </MyText>
          <MyText fontWeight="bold" fontSize={18} color={palette.blue_7b}>
            말못하는 가족의 안전을 지켜주세요!
          </MyText>
        </View>
        <Phone
          source={require("~/assets/image/intro/phone-mockup.png")}
          resizeMode="contain"
          fadeDuration={0}
          style={{
            top: rpHeight(172),
            left: !isTablet ? 0 : "auto",
            right: isTablet ? 0 : "auto",
            width: rpWidth(491),
            height: rpHeight(369),
          }}
        />
        <Button
          style={{
            marginBottom: rpWidth(94) + bottom,
          }}
          onPress={() => {
            navigation.replace("Start");
            /* dispatch(
              storageActions.setInit({
                isIntroPassed: true,
              }),
            ); */
          }}>
          어디개와 함께하기
        </Button>
      </IntroContainer>
    </>
  );
};

export default ThirdIntro;
