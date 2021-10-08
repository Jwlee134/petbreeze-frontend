import { useContext, useState } from "react";
import { Dimensions, Keyboard } from "react-native";
import { ModalProps } from "react-native-modal";
import { DimensionsContext } from "~/context/DimensionsContext";
import { bottomModalOutTiming, centerModalOutTiming } from "~/styles/constants";

const { height } = Dimensions.get("screen");

interface IModalProps extends Partial<ModalProps> {
  type: "bottom" | "center";
}

const useModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { rpWidth, width } = useContext(DimensionsContext);

  const open = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  const close = () => {
    setModalVisible(false);
  };

  const modalProps = ({
    type,
    ...props
  }: IModalProps): Partial<ModalProps> => ({
    isVisible: isModalVisible,
    backdropTransitionOutTiming: 0,
    onBackdropPress: close,
    onBackButtonPress: close,
    backdropOpacity: 0.5,
    animationInTiming:
      type === "bottom" ? bottomModalOutTiming : centerModalOutTiming,
    animationOutTiming:
      type === "bottom" ? bottomModalOutTiming : centerModalOutTiming,
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
    ...props,
  });

  return {
    open,
    close,
    modalProps,
  };
};

export default useModal;
