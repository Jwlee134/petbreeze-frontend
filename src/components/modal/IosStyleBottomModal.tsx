import React, { useContext } from "react";
import { ReactNode } from "react";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
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

const Container = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding: 0px ${rpWidth(9)}px;
    margin-bottom: ${rpWidth(34)}px;
  `}
`;

const MenuContainer = styled.View<{ rpWidth: RpWidth }>`
  background-color: ${palette.gray_f0};
  border-radius: ${({ rpWidth }) => rpWidth(15)}px;
  width: 100%;
`;

const NameContainer = styled.View<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(41)}px;
  justify-content: center;
  align-items: center;
`;

const IosStyleBottomModal = ({
  children,
  close,
  title,
  titleHeight,
}: IProps) => {
  const { rpWidth, width } = useContext(DimensionsContext);

  return (
    <Container rpWidth={rpWidth}>
      <MenuContainer rpWidth={rpWidth}>
        {title && (
          <>
            <NameContainer rpWidth={rpWidth}>
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
};

export default IosStyleBottomModal;
