import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IProps {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Container = styled.TouchableOpacity``;

const Button = styled.View<{ disabled: boolean }>`
  width: 180px;
  height: 36px;
  background-color: ${({ disabled }) =>
    !disabled ? palette.blue_6e : palette.gray_e5};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 18px;
  color: white;
`;

const ConfirmButton = ({
  children,
  onPress,
  style,
  disabled = false,
}: IProps) => (
  <Container
    style={style}
    activeOpacity={0.8}
    disabled={disabled}
    onPress={onPress}>
    <Button disabled={disabled}>
      <Label>{children}</Label>
    </Button>
  </Container>
);

export default ConfirmButton;
