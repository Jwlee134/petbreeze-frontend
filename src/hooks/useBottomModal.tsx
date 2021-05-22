import React, { ReactNode, useState } from "react";
import { ModalProps } from "react-native-modal";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IProps {
  headerTitle: string;
  children: ReactNode;
  handleDone: () => void;
}

const Container = styled.View`
  height: 230px;
  background-color: ${palette.light_grey};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
`;

const Title = styled.Text`
  font-size: 17px;
  flex-grow: 1.2;
  text-align: center;
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

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const useBottomModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const open = () => setModalVisible(true);

  const close = () => setModalVisible(false);

  const bottomModalProps: Partial<ModalProps> = {
    isVisible: isModalVisible,
    backdropTransitionOutTiming: 0,
    onBackdropPress: close,
    backdropOpacity: 0.3,
    style: { justifyContent: "flex-end", margin: 0 },
  };

  const BottomModalComponent = ({
    headerTitle,
    children,
    handleDone,
  }: IProps) => (
    <Container>
      <Header>
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
      </Header>
      <Content>{children}</Content>
    </Container>
  );

  return { open, close, bottomModalProps, BottomModalComponent };
};

export default useBottomModal;
