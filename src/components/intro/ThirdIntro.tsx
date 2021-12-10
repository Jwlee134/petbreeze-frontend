import { useNavigation } from "@react-navigation/native";
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
import Button from "../common/Button";
import { IntroContainer } from "./styles";

const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image``;

const ThirdIntro = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();
  const dispatch = useDispatch();
  const { top, bottom } = useSafeAreaInsets();
  const { rpHeight } = useContext(DimensionsContext);

  const onPress = () => {
    dispatch(storageActions.setInit({ isIntroPassed: true }));
    navigation.replace("Start");
  };

  return (
    <>
      <IntroContainer rpHeight={rpHeight} topInset={top} spaceBetween>
        <View style={{ marginLeft: 32 }}>
          <MyText fontWeight="light" fontSize={24} color={palette.blue_86}>
            펫브리즈와 함께
          </MyText>
          <MyText fontWeight="bold" fontSize={24} color={palette.blue_86}>
            확실하게 안전을 챙기세요!
          </MyText>
        </View>
        <ImageContainer>
          {/* <Image
            isTablet={isTablet}
            source={require("~/assets/image/intro/phone.png")}
            rpWidth={rpWidth}
            resizeMode="contain"
            fadeDuration={0}
          /> */}
        </ImageContainer>
        <Button
          backgroundColor="white"
          fontColor={palette.blue_7b}
          style={{
            marginBottom: rpHeight(94) + bottom,
            borderWidth: 2,
            borderColor: palette.blue_86,
          }}
          onPress={onPress}>
          시작하기
        </Button>
      </IntroContainer>
    </>
  );
};

export default ThirdIntro;
