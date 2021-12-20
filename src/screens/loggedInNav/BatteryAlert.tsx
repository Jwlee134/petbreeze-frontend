import React from "react";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import AnimatedCircularProgress from "~/components/common/AnimatedCircularProgress";
import palette from "~/styles/palette";
import NeedChargeElectricity from "~/assets/svg/batteryAlert/need-charge-electricity.svg";
import { BatteryAlertScreenProps } from "~/types/navigator";
import { View } from "react-native";

const AvatarContainer = styled.View`
  align-items: center;
`;

const BatteryAlert = ({
  navigation,
  route: {
    params: { avatarUrl, battery },
  },
}: BatteryAlertScreenProps) => (
  <SafeAreaContainer style={{ justifyContent: "space-between" }}>
    <View>
      <MyText
        style={{
          marginTop: 53,
          position: "absolute",
          alignSelf: "center",
        }}
        fontWeight="medium"
        fontSize={20}
        color={palette.blue_7b}>
        앗 ! 충전이 필요해요.
      </MyText>
    </View>
    <AvatarContainer>
      <NeedChargeElectricity
        width={105}
        height={75}
        style={{
          marginBottom: 10,
          marginLeft: 50,
        }}
      />
      <AnimatedCircularProgress
        circleWidth={160}
        lineWidth={10}
        battery={20}
        isBackgroundTransparent
        avatar={avatarUrl}
      />
      <MyText fontWeight="medium" fontSize={24} color={palette.red_f0}>
        {battery}
      </MyText>
    </AvatarContainer>
    <Button useCommonMarginBottom onPress={navigation.goBack}>
      확인
    </Button>
  </SafeAreaContainer>
);

export default BatteryAlert;
