import React, { ReactNode, useState } from "react";
import { Dimensions } from "react-native";
import { ModalProps } from "react-native-modal";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IBottomProps {
  headerTitle: string;
  children: ReactNode;
  handleDone: () => void;
}

interface ICenterProps {
  children: ReactNode;
  headerTitle?: string;
}

const BottomContainer = styled.View`
  height: 230px;
  background-color: ${palette.gray_f3};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const CenterContainer = styled.View`
  width: 300px;
  border-width: 1px;
  border-color: ${palette.gray};
  border-radius: 8px;
  overflow: hidden;
`;

const BottomHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
`;

const CenterHeader = styled.View`
  width: 100%;
  height: 46px;
  background-color: white;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 17px;
  flex-grow: 1.2;
  text-align: center;
`;

const CenterHeaderTitle = styled.Text`
  font-size: 18px;
`;

const Button = styled.TouchableOpacity`
  flex-grow: 1;
  width: 80px;
`;

const ToggleText = styled.Text`
  font-size: 17px;
  color: ${palette.light_blue};
  text-align: center;
`;

const BottomContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CenterContent = styled.View`
  background-color: white;
  padding: 22px;
`;

const height = Dimensions.get("screen").height;

const useModal = ({ type }: { type: "bottom" | "center" }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const open = () => setModalVisible(true);

  const close = () => setModalVisible(false);

  const modalProps: Partial<ModalProps> = {
    isVisible: isModalVisible,
    backdropTransitionOutTiming: 0,
    onBackdropPress: close,
    backdropOpacity: 0.3,
    style: {
      ...(type === "bottom"
        ? { justifyContent: "flex-end" }
        : { alignItems: "center" }),
      margin: 0,
    },
    ...(type === "center" && {
      animationIn: "zoomIn",
      animationOut: "zoomOut",
    }),
    deviceHeight: height,
    statusBarTranslucent: true,
  };

  const BottomModalComponent = ({
    headerTitle,
    children,
    handleDone,
  }: IBottomProps) => (
    <BottomContainer>
      <BottomHeader>
        <Button activeOpacity={0.8} onPress={close}>
          <ToggleText>Cancel</ToggleText>
        </Button>
        <Title>{headerTitle}</Title>
        <Button
          activeOpacity={0.8}
          onPress={() => {
            close();
            handleDone();
          }}>
          <ToggleText>Done</ToggleText>
        </Button>
      </BottomHeader>
      <BottomContent>{children}</BottomContent>
    </BottomContainer>
  );

  const CenterModalComponent = ({ headerTitle, children }: ICenterProps) => (
    <CenterContainer>
      {headerTitle && (
        <CenterHeader>
          <CenterHeaderTitle>{headerTitle}</CenterHeaderTitle>
        </CenterHeader>
      )}
      <CenterContent>{children}</CenterContent>
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
