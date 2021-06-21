import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

interface IProps extends TouchableOpacityProps {
  children: ReactNode;
  color?: string;
  isLeft?: boolean;
}

const Container = styled.TouchableHighlight<{ isLeft: boolean }>`
  width: 80px;
  border-width: 2px;
  border-color: ${palette.blue_6e};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  ${({ isLeft }) =>
    isLeft &&
    css`
      margin-right: 10px;
    `}
`;

const Label = styled.Text<{ color: string | undefined }>`
  font-size: 17px;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

const ModalButton = ({
  children,
  isLeft = false,
  color = palette.blue_6e,
  ...props
}: IProps) => (
  <Container underlayColor={palette.gray_f3} isLeft={isLeft} {...props}>
    <Label color={color}>{children}</Label>
  </Container>
);

export default ModalButton;
