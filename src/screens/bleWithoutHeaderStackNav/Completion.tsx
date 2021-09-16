import React, { useEffect } from "react";
import styled from "styled-components/native";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import Confetti from "~/components/lottie/Confetti";
import { rpWidth } from "~/styles";
import Footprint from "~/assets/svg/footprint/footprint-rotated.svg";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import Divider from "~/components/common/Divider";
import { Animated, View } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { CompletionScreenNavigationProp } from "~/types/navigator";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { navigatorActions } from "~/store/navigator";

const DeviceContainer = styled(Animated.View)`
  margin-top: ${rpWidth(52)}px;
  align-items: center;
`;

const Image = styled.Image`
  width: ${rpWidth(120)}px;
  height: ${rpWidth(120)}px;
  border-radius: ${rpWidth(60)}px;
  margin-bottom: ${rpWidth(10)}px;
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
  const {
    init: { isInitialized },
    device: { redirectionRouteName },
  } = useAppSelector(state => state.storage);
  const { name, deviceName, breed, birthYear, gender } = useAppSelector(
    state => state.form,
  );
  const { name: safetyZoneName } = useAppSelector(state => state.safetyZone);
  const dispatch = useDispatch();

  const [value1, value2] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterMount: 800,
    onAnimatedFinished: () => {
      setTimeout(() => {
        if (redirectionRouteName) {
        } else {
          dispatch(
            navigatorActions.setInitialRoute({
              initialLoggedInNavRouteName: "BottomTabNav",
            }),
          );
          navigation.replace("LoggedInNav");
        }
      }, 800);
    },
  });

  const translateY = value2.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(1000), 0],
  });

  useEffect(() => {
    /* if (!isInitialized) {
     dispatch(storageActions.setInit("init")); 
    }
    dispatch(storageActions.initDeviceRegistrationStep())  */
  }, []);

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
      <DeviceContainer style={{ transform: [{ translateY }] }}>
        <Image source={require("~/assets/image/test.jpg")} />
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
            <MyText style={{ width: rpWidth(100) }}>{safetyZoneName}</MyText>
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
