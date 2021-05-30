import React from "react";
import { View } from "react-native";
import palette from "~/styles/palette";
import ModalButton from "../common/button/ModalButton";
import ModalButtonContainer from "./ModalButtonContainer";
import ModalText from "./ModalText";

interface IProps {
  onLogout: () => void;
  onAbort: () => void;
}

const LogoutModal = ({ onLogout, onAbort }: IProps) => (
  <View>
    <ModalText>정말 로그아웃 하시겠습니까?</ModalText>
    <ModalButtonContainer style={{ marginTop: 40 }}>
      <ModalButton
        color={palette.red_e7}
        style={{ marginRight: 10 }}
        onPress={onLogout}>
        로그아웃
      </ModalButton>
      <ModalButton color={palette.blue_6e} onPress={onAbort}>
        취소
      </ModalButton>
    </ModalButtonContainer>
  </View>
);

export default LogoutModal;
