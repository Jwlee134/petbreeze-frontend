import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { deviceActions } from "~/store/device";
import ModalButton from "./ModalButton";
import ModalButtonContainer from "./ModalButtonContainer";
import ModalText from "./ModalText";

const Container = styled.View``;

const DeviceListModal = ({ close, id }: { close: () => void; id: number }) => {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(deviceActions.setSelected(id));
    close();
  };

  return (
    <Container>
      <ModalText>선택한 기기로 전환됩니다.</ModalText>
      <ModalText style={{ marginVertical: 18 }}>
        기기를 변경하시겠습니까?
      </ModalText>
      <ModalButtonContainer>
        <ModalButton isLeft onPress={handleSave}>
          저장
        </ModalButton>
        <ModalButton onPress={close}>취소</ModalButton>
      </ModalButtonContainer>
    </Container>
  );
};

export default DeviceListModal;
