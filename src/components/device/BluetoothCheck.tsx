import React from "react";
import Button from "../common/Button";
import {
  BigText,
  BottomContainer,
  Container,
  TopContainer,
} from "../initialization/Styles";

import Bluetooth from "~/assets/svg/initialization/bluetooth.svg";

const BluetoothCheck = ({ handleNext }: { handleNext: () => void }) => (
  <Container>
    <TopContainer>
      <Bluetooth />
      <BigText>블루투스가{"\n"}켜져있나요?</BigText>
    </TopContainer>
    <BottomContainer flexEnd>
      <Button onPress={handleNext} text="예, 켜져 있습니다." />
    </BottomContainer>
  </Container>
);

export default BluetoothCheck;
