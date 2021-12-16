import React, { ReactNode } from "react";
import { useWindowDimensions, View } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import Button from "../common/Button";
import Divider from "../common/Divider";
import MyText from "../common/MyText";
import Modal, { ModalProps } from "react-native-modal";
import { ModalPosition } from "~/hooks/useModal";

interface Props {
  children: ReactNode;
  close: () => void;
  title?: string;
  closeButtonText?: string;
  modalProps: ({
    type,
    ...props
  }: Partial<ModalProps> & {
    type: ModalPosition;
  }) => Partial<ModalProps>;
}

const Container = styled.View`
  padding: 0 9px;
`;

const MenuContainer = styled.View`
  background-color: ${palette.gray_f0};
  border-radius: 15px;
  width: 100%;
`;

const NameContainer = styled.View`
  height: 41px;
  justify-content: center;
  align-items: center;
`;

const CloseButtonContainer = styled.View`
  margin-top: 9px;
  height: 50px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;

const IosBottomModal = ({
  children,
  close,
  title,
  closeButtonText = "취소",
  modalProps,
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <Modal {...modalProps({ type: ModalPosition.Bottom })}>
      <Container style={{ marginBottom: isIphoneX() ? bottom : 9 }}>
        <MenuContainer>
          {title && (
            <>
              <NameContainer>
                <MyText
                  fontSize={14}
                  fontWeight="medium"
                  color="rgba(0, 0, 0, 0.3)">
                  {title}
                </MyText>
              </NameContainer>
              <Divider />
            </>
          )}
          {children}
        </MenuContainer>
        <CloseButtonContainer>
          <Button
            onPress={close}
            style={{ width: width - 18 }}
            backgroundColor="white"
            fontWeight="medium"
            fontColor={palette.blue_7b}>
            {closeButtonText}
          </Button>
        </CloseButtonContainer>
      </Container>
    </Modal>
  );
};

export default IosBottomModal;
