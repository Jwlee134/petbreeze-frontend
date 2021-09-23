import { useContext, useState } from "react";
import { Dimensions, Keyboard } from "react-native";
import { ModalProps } from "react-native-modal";
import { DimensionsContext } from "~/context/DimensionsContext";

const { width, height } = Dimensions.get("screen");

const useModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { rpWidth } = useContext(DimensionsContext);

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
    backdropOpacity: 0.5,
    animationInTiming: type === "bottom" ? 400 : 200,
    animationOutTiming: type === "bottom" ? 400 : 200,
    animationIn: type === "bottom" ? "slideInUp" : "fadeIn",
    animationOut: type === "bottom" ? "slideOutDown" : "fadeOut",
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
