import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IProps extends TouchableOpacityProps {
  children: ReactNode;
  disabled?: boolean;
}

const Container = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 180px;
  height: 44px;
  background-color: ${({ disabled }) =>
    !disabled ? palette.blue_6e : palette.gray_b4};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 18px;
  color: white;
`;

const ConfirmButton = ({ children, disabled = false, ...props }: IProps) => (
  <Container activeOpacity={0.8} disabled={disabled} {...props}>
    <Label>{children}</Label>
  </Container>
);

export default ConfirmButton;
