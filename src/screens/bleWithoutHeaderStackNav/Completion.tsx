import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components/native";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import Confetti from "~/components/lottie/Confetti";
import Footprint from "~/assets/svg/footprint/footprint-rotated.svg";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import Divider from "~/components/common/Divider";
import { Animated, View } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { CompletionScreenNavigationProp } from "~/types/navigator";
import { useDispatch } from "react-redux";
import { navigatorActions } from "~/store/navigator";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const DeviceContainer = styled(Animated.View)<{ rpWidth: RpWidth }>`
  margin-top: ${({ rpWidth }) => rpWidth(52)}px;
  align-items: center;
`;

const Image = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(120)}px;
    height: ${rpWidth(120)}px;
    border-radius: ${rpWidth(60)}px;
    margin-bottom: ${rpWidth(10)}px;
  `}
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Completion = ({
  navigation,
}: {
  navigation: CompletionScreenNavigationProp;
}) => {
  const { name, deviceName, breed, birthYear, gender } = useAppSelector(
    state => state.form,
  );
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);

  const [value1, value2] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterMount: 800,
    onAnimatedFinish: () => {
      setTimeout(() => {
        dispatch(
          navigatorActions.setInitialRoute({
            initialLoggedInNavRouteName: "BottomTabNav",
            ...(redirectionRouteName && redirectionRouteName === "MyPage"
              ? { initialBottomTabNavRouteName: "MyPageTab" }
              : {
                  initialBottomTabNavRouteName: "WalkTab",
                }),
          }),
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "LoggedInNav" }],
        });
      }, 800);
    },
  });

  const translateY = value2.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(1000), 0],
  });

  return (
    <SafeAreaContainer>
      <Confetti />
      <Animated.View style={{ opacity: value1 }}>
        <MyText
          style={{ textAlign: "center", marginTop: rpWidth(88) }}
          fontWeight="medium"
          fontSize={24}>
          모든 단계를{"\n"}완료했습니다!
        </MyText>
      </Animated.View>
      <DeviceContainer
        rpWidth={rpWidth}
        style={{ transform: [{ translateY }] }}>
        <Image rpWidth={rpWidth} source={require("~/assets/image/test.jpg")} />
        <RowContainer>
          <Footprint
            width={rpWidth(22)}
            height={rpWidth(21)}
            style={{ marginTop: rpWidth(3), marginRight: rpWidth(3) }}
          />
          <MyText fontWeight="medium" fontSize={20} color={palette.blue_7b_90}>
            {name}
          </MyText>
        </RowContainer>
        <RowContainer>
          <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
            {breed}
          </MyText>
          <Divider
            isVertical
            style={{ height: rpWidth(10), marginHorizontal: rpWidth(5) }}
          />
          <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
            {new Date().getFullYear() - Number(birthYear || 1997) + 1}세
          </MyText>
          <Divider
            isVertical
            style={{ height: rpWidth(10), marginHorizontal: rpWidth(5) }}
          />
          <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
            {gender}
          </MyText>
        </RowContainer>
        <View style={{ marginTop: rpWidth(30), height: rpWidth(200) }}>
          <RowContainer
            style={{ alignItems: "flex-start", marginBottom: rpWidth(12) }}>
            <MyText
              style={{ width: rpWidth(100) }}
              fontSize={14}
              color="rgba(0, 0, 0, 0.5)">
              디바이스 이름
            </MyText>
            <MyText style={{ width: rpWidth(100) }}>{deviceName}</MyText>
          </RowContainer>
          <RowContainer>
            <MyText
              style={{ width: rpWidth(100) }}
              fontSize={14}
              color="rgba(0, 0, 0, 0.5)">
              안심존
            </MyText>
            <MyText style={{ width: rpWidth(100) }}>내 안심존</MyText>
          </RowContainer>
        </View>
        <MyText
          style={{ textAlign: "center" }}
          fontSize={12}
          color="rgba(0, 0, 0, 0.3)">
          마이페이지에서 안심존 및 기기 추가 등록을 하실 수 있습니다.
        </MyText>
      </DeviceContainer>
    </SafeAreaContainer>
  );
};

export default Completion;
