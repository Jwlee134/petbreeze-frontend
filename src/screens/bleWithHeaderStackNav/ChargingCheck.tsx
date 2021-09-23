import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import Device from "~/assets/svg/device/device-charging.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { ChargingCheckScreenNavigationProp } from "~/types/navigator";
import { bleActions } from "~/store/ble";
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

const ChargingCheck = ({
  navigation,
}: {
  navigation: ChargingCheckScreenNavigationProp;
}) => {
  const dispatch = useDispatch();
  const { rpWidth, rpHeight } = useContext(DimensionsContext);

  return (
    <SafeAreaContainer>
      <TopContainer>
        <Device width={rpWidth(100)} height={rpWidth(156)} />
        <MyText
          fontSize={24}
          style={{
            marginTop: rpHeight(56),
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
