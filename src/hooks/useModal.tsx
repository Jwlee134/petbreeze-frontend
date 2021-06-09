import React, { ReactNode, useState } from "react";
import { Dimensions, Keyboard } from "react-native";
import { ModalProps } from "react-native-modal";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IModalProps {
  type: "bottom" | "center";
  handleCancel?: () => void;
}

interface IBottomProps {
  headerTitle: string;
  children: ReactNode;
  handleDone: () => void;
  isOneStep?: boolean;
  useHeaderButton?: boolean;
}

const centerModalWidth = Dimensions.get("screen").width - 76;
const height = Dimensions.get("screen").height;

interface ICenterProps {
  children: ReactNode;
  headerTitle?: string;
  useContentPadding?: boolean;
}

const BottomContainer = styled.View`
  height: 230px;
  background-color: ${palette.gray_f3};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const CenterContainer = styled.View`
  width: ${centerModalWidth}px;
  border-width: 1px;
  border-color: ${palette.gray_e5};
  border-radius: 8px;
  overflow: hidden;
`;

const BottomHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44px;
`;

const CenterHeader = styled.View`
  width: 100%;
  height: 46px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 17px;
  text-align: center;
  width: 33.3%;
`;

const CenterHeaderTitle = styled.Text`
  font-size: 18px;
  color: ${palette.blue_6e};
`;

const Button = styled.TouchableOpacity`
  height: 100%;
  width: 33.3%;
  justify-content: center;
`;

const ToggleText = styled.Text`
  font-size: 17px;
  color: ${palette.blue_00};
  text-align: center;
`;

const BottomContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CenterContent = styled.View<{ useContentPadding: boolean }>`
  background-color: white;
  padding: ${({ useContentPadding }) => (useContentPadding ? "22px" : "0px")};
`;

const useModal = ({ type, handleCancel }: IModalProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const open = () => {
    setModalVisible(true);
    Keyboard.dismiss();
  };

  const close = () => setModalVisible(false);

  const modalProps: Partial<ModalProps> = {
    isVisible: isModalVisible,
    backdropTransitionOutTiming: 0,
    onBackdropPress: () => {
      if (handleCancel) handleCancel();
      close();
    },
    onBackButtonPress: () => {
      if (handleCancel) handleCancel();
      close();
    },
    backdropOpacity: 0.3,
    style: {
      ...(type === "bottom"
        ? { justifyContent: "flex-end" }
        : { alignItems: "center" }),
      margin: 0,
    },
    ...(type === "center" && {
      animationIn: "fadeInUp",
      animationOut: "fadeOutDown",
    }),
    deviceHeight: height,
    statusBarTranslucent: true,
  };

  const BottomModalComponent = ({
    headerTitle,
    children,
    handleDone,
    useHeaderButton = true,
    isOneStep = true,
  }: IBottomProps) => (
    <BottomContainer>
      <BottomHeader>
        {useHeaderButton && (
          <Button
            activeOpacity={0.8}
            onPress={() => {
              if (handleCancel) handleCancel();
              close();
            }}>
            <ToggleText>Cancel</ToggleText>
          </Button>
        )}
        <Title>{headerTitle}</Title>
        {useHeaderButton && (
          <Button
            activeOpacity={0.8}
            onPress={() => {
              if (isOneStep) close();
              handleDone();
            }}>
            <ToggleText>Done</ToggleText>
          </Button>
        )}
      </BottomHeader>
      <BottomContent>{children}</BottomContent>
    </BottomContainer>
  );

  const CenterModalComponent = ({
    headerTitle,
    children,
    useContentPadding = true,
  }: ICenterProps) => (
    <CenterContainer>
      {headerTitle && (
        <CenterHeader>
          <CenterHeaderTitle>{headerTitle}</CenterHeaderTitle>
        </CenterHeader>
      )}
      <CenterContent useContentPadding={useContentPadding}>
        {children}
      </CenterContent>
    </CenterContainer>
  );

  return {
    open,
    close,
    modalProps,
    BottomModalComponent,
    CenterModalComponent,
  };
};

export default useModal;
