import React, { useEffect } from "react";
import styled from "styled-components/native";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import Confetti from "~/components/lottie/Confetti";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import Divider from "~/components/common/Divider";
import { Animated } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { WelcomeScreenNavigationProp } from "~/types/navigator";
import { noAvatar, noName } from "~/constants";
import { useDispatch } from "react-redux";
import { formActions } from "~/store/form";

const DeviceContainer = styled(Animated.View)`
  align-items: center;
`;

const Image = styled.Image`
  width: 164px;
  height: 164px;
  border-radius: 82px;
  margin-top: 93px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Welcome = ({
  navigation,
}: {
  navigation: WelcomeScreenNavigationProp;
}) => {
  const { name, species, birthYear, sex, photos } = useAppSelector(
    state => state.form,
  );
  const dispatch = useDispatch();

  const [value1, value2] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterMount: 800,
    onAnimatedFinish: () => {
      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: "BottomTabNav" }] });
      }, 800);
    },
  });

  const translateY = value2.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 0],
  });

  useEffect(() => {
    return () => {
      dispatch(formActions.setState(null));
    };
  }, []);

  return (
    <>
      <Confetti />
      <SafeAreaContainer style={{ justifyContent: "center" }}>
        <Animated.View style={{ opacity: value1 }}>
          <MyText
            style={{ textAlign: "center" }}
            fontWeight="medium"
            fontSize={24}>
            환영합니다!
          </MyText>
        </Animated.View>
        <DeviceContainer style={{ transform: [{ translateY }] }}>
          <Image source={photos[0] ? { uri: photos[0] } : noAvatar} />
          <MyText
            style={{ marginTop: 15, marginBottom: 8 }}
            fontWeight="medium"
            fontSize={24}
            color={palette.blue_86}>
            {name || noName}
          </MyText>
          <RowContainer>
            <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
              {species}
            </MyText>
            <Divider isVertical style={{ height: 10, marginHorizontal: 5 }} />
            <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
              {birthYear
                ? `${
                    new Date().getFullYear() - Number(birthYear || 1997) + 1
                  }세`
                : "나이 미상"}
            </MyText>
            <Divider isVertical style={{ height: 10, marginHorizontal: 5 }} />
            <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
              {sex ? "남" : "여"}
            </MyText>
          </RowContainer>
          <MyText
            style={{ textAlign: "center", marginTop: 93 }}
            fontSize={12}
            color="rgba(0, 0, 0, 0.3)">
            마이페이지에서 안심존 및 기기 추가 등록을 하실 수 있습니다.
          </MyText>
        </DeviceContainer>
      </SafeAreaContainer>
    </>
  );
};

export default Welcome;
