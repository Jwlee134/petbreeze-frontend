import { useState } from "react";
import { Dimensions, Keyboard } from "react-native";
import { ModalProps } from "react-native-modal";
import { rpWidth } from "~/styles";

const { width, height } = Dimensions.get("screen");

const useModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const open = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  const close = () => {
    setModalVisible(false);
  };

  const modalProps = ({
    type,
  }: {
    type: "bottom" | "center";
  }): Partial<ModalProps> => ({
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
        : { alignItems: "center", marginHorizontal: rpWidth(16) }),
    },
  });

  return {
    open,
    close,
    modalProps,
  };
};

export default useModal;
