import React from "react";
import styled, { css } from "styled-components/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import palette from "~/styles/palette";
import { TouchableOpacityProps } from "react-native";

interface IProps extends TouchableOpacityProps {
  onPress?: () => void;
  size: number;
  isFloating?: boolean;
}

const Button = styled.TouchableOpacity<{ isFloating: boolean; size: number }>`
  border-radius: 100px;
  width: ${({ size }) => `${size}px`};
  ${({ isFloating }) =>
    isFloating &&
    css`
      position: absolute;
      bottom: 20px;
      right: 20px;
    `};
`;

const AddCircleButton = ({
  onPress,
  size,
  isFloating = false,
  ...props
}: IProps) => (
  <Button
    isFloating={isFloating}
    activeOpacity={0.9}
    onPress={onPress}
    size={size}
    {...props}>
    <AntDesign name="pluscircle" size={size} color={palette.blue} />
  </Button>
);

export default AddCircleButton;
