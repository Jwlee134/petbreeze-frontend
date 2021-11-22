import React from "react";
import styled from "styled-components/native";
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
import { noAvatar, noName } from "~/constants";

const DeviceContainer = styled(Animated.View)`
  margin-top: $52px;
  align-items: center;
`;

const Image = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 10px;
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
    safetyZone: {
      draft: { name: safetyZoneName },
    },
  } = useAppSelector(state => state.deviceSetting);
  const { name, species, birthYear, sex, photos } = useAppSelector(
    state => state.form,
  );
  const deviceID = useAppSelector(state => state.ble.deviceID);

  const [value1, value2] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterMount: 800,
    onAnimatedFinish: () => {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.replace("LoggedInNav");
        }
      }, 800);
    },
  });

  const translateY = value2.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 0],
  });

  return (
    <SafeAreaContainer>
      <Confetti />
      <Animated.View style={{ opacity: value1 }}>
        <MyText
          style={{ textAlign: "center", marginTop: 88 }}
          fontWeight="medium"
          fontSize={24}>
          모든 단계를{"\n"}완료했습니다!
        </MyText>
      </Animated.View>
      <DeviceContainer style={{ transform: [{ translateY }] }}>
        <Image source={photos[0] ? { uri: photos[0] } : noAvatar} />
        <RowContainer>
          <Footprint
            width={22}
            height={21}
            style={{ marginTop: 3, marginRight: 3 }}
          />
          <MyText fontWeight="medium" fontSize={20} color={palette.blue_7b_90}>
            {name || noName}
          </MyText>
        </RowContainer>
        <RowContainer>
          <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
            {species}
          </MyText>
          <Divider isVertical style={{ height: 10, marginHorizontal: 5 }} />
          <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
            {birthYear
              ? `${new Date().getFullYear() - Number(birthYear || 1997) + 1}세`
              : "나이 미상"}
          </MyText>
          <Divider isVertical style={{ height: 10, marginHorizontal: 5 }} />
          <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
            {sex ? "남" : "여"}
          </MyText>
        </RowContainer>
        <View style={{ marginTop: 30, height: 200 }}>
          <RowContainer style={{ alignItems: "flex-start", marginBottom: 12 }}>
            <MyText
              style={{ width: 100 }}
              fontSize={14}
              color="rgba(0, 0, 0, 0.5)">
              디바이스 이름
            </MyText>
            <MyText style={{ width: 100 }}>{deviceID}</MyText>
          </RowContainer>
          {safetyZoneName ? (
            <RowContainer>
              <MyText
                style={{ width: 100 }}
                fontSize={14}
                color="rgba(0, 0, 0, 0.5)">
                안심존
              </MyText>
              <MyText style={{ width: 100 }}>{safetyZoneName}</MyText>
            </RowContainer>
          ) : null}
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
