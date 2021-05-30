import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

interface IProps extends TouchableOpacityProps {
  children: ReactNode;
  color?: string;
}

const Container = styled.TouchableOpacity`
  width: 80px;
  border-width: 2px;
  border-color: ${palette.blue_6e};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 6px;
`;

const Label = styled.Text<{ color: string | undefined }>`
  font-size: 17px;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

const ModalButton = ({ children, color, ...props }: IProps) => (
  <Container activeOpacity={0.8} {...props}>
    <Label color={color}>{children}</Label>
  </Container>
);

export default ModalButton;
