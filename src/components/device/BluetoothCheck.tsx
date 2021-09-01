import React from "react";
import Button from "../common/Button";

import Bluetooth from "~/assets/svg/deviceRegistration/bluetooth.svg";
import useDisableButton from "~/hooks/useDisableButton";
import { rpWidth } from "~/styles";
import styled from "styled-components/native";
import SidePaddingContainer from "../common/container/SidePaddingContainer";
import MyText from "../common/MyText";
import { View } from "react-native";
import SafeAreaContainer from "../common/container/SafeAreaContainer";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";

const TopContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BluetoothCheck = ({ next }: { next: () => void }) => {
  const { disable, disabled } = useDisableButton();
  const dispatch = useDispatch();

  console.log("bluetoothcheck");
  return (
    <SafeAreaContainer>
      <SidePaddingContainer style={{ flex: 1 }}>
        <TopContainer>
          <View />
          <Bluetooth width={rpWidth(88)} height={rpWidth(116)} />
          <MyText style={{ textAlign: "center" }} fontSize={24}>
            블루투스가{"\n"}켜져있나요?
          </MyText>
        </TopContainer>
        <BottomContainer>
          <Button
            useCommonMarginBottom
            onPress={() => {
              if (disabled) return;
              next();
              dispatch(commonActions.setBleStatus("allSuccess"));
              disable();
            }}>
            네, 켜져 있습니다.
          </Button>
        </BottomContainer>
      </SidePaddingContainer>
    </SafeAreaContainer>
  );
};

export default React.memo(BluetoothCheck);
