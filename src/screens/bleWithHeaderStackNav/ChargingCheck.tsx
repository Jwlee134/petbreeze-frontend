import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import Device from "~/assets/svg/device/device-charging.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { ChargingCheckScreenNavigationProp } from "~/types/navigator";
import { bleActions } from "~/store/ble";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ChargingCheck = ({
  navigation,
}: {
  navigation: ChargingCheckScreenNavigationProp;
}) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaContainer>
      <TopContainer>
        <Device width={100} height={156} />
        <MyText
          fontSize={24}
          style={{
            marginTop: 56,
            textAlign: "center",
          }}>
          충전기를{"\n"}
          연결해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer>
        <Button
          useCommonMarginBottom
          onPress={() => {
            navigation.replace("BleWithoutHeaderStackNav");
            dispatch(bleActions.setStatus("scanning"));
          }}>
          다음
        </Button>
      </BottomContainer>
    </SafeAreaContainer>
  );
};

export default ChargingCheck;
