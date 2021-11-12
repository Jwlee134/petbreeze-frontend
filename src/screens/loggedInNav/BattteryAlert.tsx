import React, { useContext } from "react";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import AnimatedCircularProgress from "~/components/common/AnimatedCircularProgress";
import { DimensionsContext } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import NeedChargeElectricity from "~/assets/svg/need-charge-electricity.svg";
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
}: BatteryAlertScreenProps) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <SafeAreaContainer style={{ justifyContent: "space-between" }}>
      <View>
        <MyText
          style={{
            marginTop: rpWidth(53),
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
          width={rpWidth(105)}
          height={rpWidth(75)}
          style={{
            marginBottom: rpWidth(10),
            marginLeft: rpWidth(50),
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
};

export default BatteryAlert;
