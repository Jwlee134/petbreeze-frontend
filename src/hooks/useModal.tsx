import { ReactNode, useState } from "react";
import { Dimensions, Keyboard } from "react-native";
import { ModalProps } from "react-native-modal";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

const CenterContainer = styled.View`
  border-radius: 25px;
  background-color: white;
  position: relative;
  width: 100%;
`;

const useModal = ({ type }: { type: "bottom" | "center" }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const open = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  const close = () => {
    setModalVisible(false);
  };

  const modalProps: Partial<ModalProps> = {
    isVisible: isModalVisible,
    backdropTransitionOutTiming: 0,
    onBackdropPress: close,
    onBackButtonPress: close,
    backdropOpacity: 0.3,
    animationIn: type === "bottom" ? "slideInUp" : "fadeInUp",
    animationOut: type === "bottom" ? "slideOutDown" : "fadeOutDown",
    deviceWidth: width,
    deviceHeight: height,
    statusBarTranslucent: true,
    useNativeDriver: true,
    hideModalContentWhileAnimating: true,
    style: {
      margin: 0,
      ...(type === "bottom"
        ? { justifyContent: "flex-end" }
        : { alignItems: "center" }),
    },
  };

  return {
    open,
    close,
    modalProps,
  };
};

export default useModal;
