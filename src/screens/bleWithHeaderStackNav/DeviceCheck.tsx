import React, { useContext } from "react";
import styled from "styled-components/native";

import Device from "~/assets/svg/device/device.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { DeviceCheckScreenNavigationProp } from "~/types/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const DeviceCheck = ({
  navigation,
}: {
  navigation: DeviceCheckScreenNavigationProp;
}) => {
  const { rpHeight, rpWidth } = useContext(DimensionsContext);

  return (
    <SafeAreaContainer>
      <TopContainer>
        <Device width={rpWidth(100)} height={rpHeight(156)} />
        <MyText
          fontSize={24}
          style={{
            marginTop: rpHeight(56),
            textAlign: "center",
          }}>
          디바이스가{"\n"}
          있으신가요?
        </MyText>
      </TopContainer>
      <BottomContainer>
        <Button
          style={{
            marginBottom: rpHeight(12),
          }}
          onPress={() => {
            navigation.navigate("ChargingCheck");
          }}
          delay={400}>
          네, 있습니다.
        </Button>
        <Button
          backgroundColor="transparent"
          fontColor="rgba(0, 0, 0, 0.5)"
          useCommonMarginBottom
          onPress={() => {
            navigation.replace("LoggedInNav", {
              initialRouteName: "BottomTabNav",
            });
          }}>
          건너뛰기
        </Button>
      </BottomContainer>
    </SafeAreaContainer>
  );
};

export default DeviceCheck;
