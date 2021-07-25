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
import { commonActions } from "~/store/common";
import { Status } from "~/hooks/useBleManager";
import { useDispatch } from "react-redux";

const BluetoothCheck = ({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}) => {
  const { disable, disabled } = useDisableButton();
  const dispatch = useDispatch();

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
            dispatch(commonActions.setPage("next"));
            setStatus({
              value: "searching",
              text: "디바이스 검색 중...",
            });
            disable();
          }}
          text="예, 켜져 있습니다."
        />
      </BottomContainer>
    </Container>
  );
};

export default BluetoothCheck;
