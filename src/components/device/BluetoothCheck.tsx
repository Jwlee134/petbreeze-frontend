import React from "react";
import Button from "../common/Button";

import Bluetooth from "~/assets/svg/deviceRegistration/bluetooth.svg";
import useDisableButton from "~/hooks/useDisableButton";
import { rpHeight, rpWidth, width } from "~/styles";
import styled from "styled-components/native";
import SidePaddingContainer from "../common/container/SidePaddingContainer";
import MyText from "../common/MyText";
import { View } from "react-native";
import SafeAreaContainer from "../common/container/SafeAreaContainer";
import { useEffect } from "react";

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
  handleNext,
  handlePreRender,
}: {
  handleNext: () => void;
  handlePreRender: () => void;
}) => {
  const { disable, disabled } = useDisableButton();

  useEffect(() => {
    handlePreRender();
  }, []);

  return (
    <SafeAreaContainer>
      <SidePaddingContainer>
        <TopContainer>
          <View />
          <Bluetooth width={rpWidth(88)} height={rpHeight(116)} />
          <MyText style={{ textAlign: "center" }} fontSize={24}>
            블루투스가{"\n"}켜져있나요?
          </MyText>
        </TopContainer>
        <BottomContainer>
          <Button
            style={{ marginBottom: rpHeight(32) }}
            onPress={() => {
              if (disabled) return;
              handleNext();
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
