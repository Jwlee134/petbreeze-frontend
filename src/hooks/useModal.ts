import { useState } from "react";
import { Dimensions, Keyboard, useWindowDimensions } from "react-native";
import { ModalProps } from "react-native-modal";
import { bottomModalOutTiming, centerModalOutTiming } from "~/styles/constants";

export enum ModalPosition {
  Bottom,
  Center,
}

const { height } = Dimensions.get("screen");

const useModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();

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
  }: Partial<ModalProps> & {
    type: ModalPosition;
  }): Partial<ModalProps> => ({
    isVisible: isModalVisible,
    backdropTransitionOutTiming: 0,
    onBackdropPress: close,
    onBackButtonPress: close,
    backdropOpacity: 0.5,
    animationInTiming:
      type === ModalPosition.Bottom
        ? bottomModalOutTiming
        : centerModalOutTiming,
    animationOutTiming:
      type === ModalPosition.Bottom
        ? bottomModalOutTiming
        : centerModalOutTiming,
    animationIn: type === ModalPosition.Bottom ? "slideInUp" : "fadeIn",
    animationOut: type === ModalPosition.Bottom ? "slideOutDown" : "fadeOut",
    deviceWidth: width,
    deviceHeight: height,
    statusBarTranslucent: true,
    useNativeDriver: true,
    hideModalContentWhileAnimating: true,
    style: {
      margin: 0,
      ...(type === ModalPosition.Bottom
        ? { justifyContent: "flex-end" }
        : { alignItems: "center", marginHorizontal: 16 }),
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
