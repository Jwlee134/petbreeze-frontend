import React from "react";
import Button from "../common/Button";
import {
  BigText,
  BottomContainer,
  Container,
  TopContainer,
} from "../initialization/Styles";

import Bluetooth from "~/assets/svg/initialization/bluetooth.svg";
import useDisableButton from "~/hooks/useDisableButton";

const BluetoothCheck = ({ handleNext }: { handleNext: () => void }) => {
  const { disable, disabled } = useDisableButton();

  return (
    <Container>
      <TopContainer>
        <Bluetooth />
        <BigText>블루투스가{"\n"}켜져있나요?</BigText>
      </TopContainer>
      <BottomContainer flexEnd>
        <Button
          onPress={() => {
            if (disabled) return;
            handleNext();
            disable();
          }}
          text="예, 켜져 있습니다."
        />
      </BottomContainer>
    </Container>
  );
};

export default BluetoothCheck;
