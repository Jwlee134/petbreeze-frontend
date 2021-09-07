import React from "react";
import Button from "../../components/common/Button";

import Bluetooth from "~/assets/svg/deviceRegistration/bluetooth.svg";
import { rpWidth } from "~/styles";
import styled from "styled-components/native";
import SidePaddingContainer from "../../components/common/container/SidePaddingContainer";
import MyText from "../../components/common/MyText";
import { View } from "react-native";
import SafeAreaContainer from "../../components/common/container/SafeAreaContainer";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import { BluetoothCheckScreenNavigationProp } from "~/types/navigator";

const TopContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BluetoothCheck = ({
  navigation,
}: {
  navigation: BluetoothCheckScreenNavigationProp;
}) => {
  const dispatch = useDispatch();

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
              navigation.replace("BleProgress");
              dispatch(commonActions.setBleStatus("allSuccess"));
            }}>
            네, 켜져 있습니다.
          </Button>
        </BottomContainer>
      </SidePaddingContainer>
    </SafeAreaContainer>
  );
};

export default BluetoothCheck;
