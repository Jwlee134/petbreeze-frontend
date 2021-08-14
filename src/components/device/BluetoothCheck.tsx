import React from "react";
import Button from "../common/Button";
import {
  BigText,
  BottomContainer,
  Container,
  TopContainer,
} from "../init/Styles";

import Bluetooth from "~/assets/svg/deviceRegistration/bluetooth.svg";
import useDisableButton from "~/hooks/useDisableButton";
import { commonActions } from "~/store/common";
import { Status } from "~/hooks/useBleManager";
import { useDispatch } from "react-redux";
import { rpHeight, rpWidth } from "~/styles";

const BluetoothCheck = ({
  setStatus,
  next,
}: {
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  next: () => void;
}) => {
  const { disable, disabled } = useDisableButton();
  const dispatch = useDispatch();

  return (
    <Container>
      <TopContainer>
        <Bluetooth width={rpWidth(88)} height={rpHeight(116)} />
        <BigText>블루투스가{"\n"}켜져있나요?</BigText>
      </TopContainer>
      <BottomContainer flexEnd>
        <Button
          onPress={() => {
            if (disabled) return;
            next();
            setStatus({
              value: "searching",
              text: "디바이스 검색 중...",
            });
            disable();
          }}>
          네, 켜져 있습니다.
        </Button>
      </BottomContainer>
    </Container>
  );
};

export default BluetoothCheck;
