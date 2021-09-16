import React from "react";
import { ReactNode } from "react";
import styled from "styled-components/native";
import { rpHeight, rpWidth, width } from "~/styles";
import palette from "~/styles/palette";
import Button from "../common/Button";
import Divider from "../common/Divider";
import MyText from "../common/MyText";

interface IProps {
  children: ReactNode;
  close: () => void;
  title?: string;
  titleHeight?: number;
}

const Container = styled.View`
  padding: 0px ${rpWidth(9)}px;
  margin-bottom: ${rpHeight(34)}px;
`;

const MenuContainer = styled.View`
  background-color: ${palette.gray_f0};
  border-radius: ${rpWidth(15)}px;
  width: 100%;
`;

const NameContainer = styled.View`
  height: ${rpWidth(41)}px;
  justify-content: center;
  align-items: center;
`;

const IosStyleBottomModal = ({
  children,
  close,
  title,
  titleHeight,
}: IProps) => (
  <Container>
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
    <Button
      activeOpacity={1}
      onPress={close}
      style={{
        width: width - rpWidth(18),
        borderRadius: rpWidth(12),
        marginTop: rpWidth(9),
      }}
      backgroundColor="white"
      fontColor={palette.blue_7b}>
      취소
    </Button>
  </Container>
);

export default IosStyleBottomModal;
