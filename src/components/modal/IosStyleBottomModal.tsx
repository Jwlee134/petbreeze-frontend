import React from "react";
import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import { isAndroid } from "~/utils";
import Button from "../common/Button";

interface IProps {
  children: ReactNode;
  close: () => void;
}

const Container = styled.View<{ bottom: number }>`
  padding: 0px ${rpWidth(9)}px;
  margin-bottom: ${isAndroid ? "34px" : 0};
`;

const IosStyleBottomModal = ({ children, close }: IProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Container bottom={bottom}>
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
};

export default IosStyleBottomModal;
