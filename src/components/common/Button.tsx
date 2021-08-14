import React, { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import MyText, { fontWeight } from "./MyText";

interface IButton extends TouchableOpacityProps {
  children?: ReactNode;
  backgroundColor?: string;
  RightIcon?: () => JSX.Element;
  disabled?: boolean;
  isLoading?: boolean;
  fontWeight?: fontWeight;
  fontColor?: string;
}

interface ITouchableOpacity {
  disabled: boolean;
  backgroundColor: string | undefined;
}

const StyledButton = styled.TouchableOpacity<ITouchableOpacity>`
  width: 100%;
  height: ${rpWidth(50)}px;
  border-radius: ${rpWidth(25)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : palette.blue_7b};
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: rgba(0, 0, 0, 0.1);
    `}
`;

const Button = ({
  children,
  backgroundColor,
  RightIcon,
  fontWeight,
  fontColor,
  isLoading = false,
  disabled = false,
  ...props
}: IButton) => (
  <StyledButton
    backgroundColor={backgroundColor}
    disabled={disabled}
    {...props}>
    {isLoading ? (
      <ActivityIndicator color="white" />
    ) : (
      <>
        {RightIcon && <RightIcon />}
        <MyText
          fontWeight={fontWeight ? fontWeight : "medium"}
          color={
            disabled ? "rgba(0, 0, 0, 0.5)" : fontColor ? fontColor : "white"
          }>
          {children}
        </MyText>
      </>
    )}
  </StyledButton>
);

export default Button;
