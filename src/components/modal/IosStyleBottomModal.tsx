import React from "react";
import { ReactNode } from "react";
import styled from "styled-components/native";
import { rpHeight, rpWidth } from "~/styles";
import palette from "~/styles/palette";
import Button from "../common/Button";

interface IProps {
  children: ReactNode;
  close: () => void;
}

const Container = styled.View`
  padding: 0px ${rpWidth(9)}px;
  margin-bottom: ${rpHeight(34)}px;
`;

const IosStyleBottomModal = ({ children, close }: IProps) => (
  <Container>
    {children}
    <Button
      activeOpacity={1}
      onPress={close}
      style={{ height: rpWidth(56), borderRadius: 15, marginTop: rpWidth(9) }}
      backgroundColor="white"
      fontColor={palette.blue_7b}>
      취소
    </Button>
  </Container>
);

export default IosStyleBottomModal;
