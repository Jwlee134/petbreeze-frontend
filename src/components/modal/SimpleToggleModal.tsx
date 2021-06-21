import React from "react";
import { View } from "react-native";
import ModalButton from "./ModalButton";
import ModalButtonContainer from "./ModalButtonContainer";
import ModalText from "./ModalText";

interface IProps {
  onConfirm: () => void;
  onConfirmText: string;
  onConfirmButtonText: string;
  onAbort: () => void;
}

const SimpleToggleModal = ({
  onConfirm,
  onConfirmText,
  onConfirmButtonText,
  onAbort,
}: IProps) => (
  <View>
    <ModalText style={{ marginTop: 10 }}>{onConfirmText}</ModalText>
    <ModalButtonContainer style={{ marginTop: 50 }}>
      <ModalButton isLeft onPress={onConfirm}>
        {onConfirmButtonText}
      </ModalButton>
      <ModalButton onPress={onAbort}>취소</ModalButton>
    </ModalButtonContainer>
  </View>
);

export default SimpleToggleModal;
