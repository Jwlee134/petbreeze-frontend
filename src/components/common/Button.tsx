import React, { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

interface IButton extends TouchableOpacityProps {
  children?: ReactNode;
  text?: string;
  textColor?: "black";
  background?: "transparent";
  Icon?: () => JSX.Element;
  disabled?: boolean;
  isLoading?: boolean;
}

interface ITouchableOpacity {
  background: "transparent" | undefined;
  disabled: boolean;
}

interface IText {
  textColor: "black" | undefined;
  background: "transparent" | undefined;
}

const StyledButton = styled.TouchableOpacity<ITouchableOpacity>`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${palette.blue_6e};
  ${({ background }) =>
    background === "transparent" &&
    css`
      background-color: transparent;
      border-width: 1px;
    `};
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${palette.gray_b4};
    `}
`;

const IconContainer = styled.View`
  margin-right: 8px;
`;

const Text = styled.Text<IText>`
  font-size: 16px;
  color: ${({ textColor, background }) =>
    textColor ? textColor : background === "transparent" ? "black" : "white"};
`;

const Button = ({
  children,
  text,
  textColor,
  Icon,
  background,
  isLoading = false,
  disabled = false,
  ...props
}: IButton) => (
  <StyledButton
    disabled={disabled}
    background={background}
    activeOpacity={1}
    {...props}>
    {isLoading ? (
      <ActivityIndicator color="white" />
    ) : (
      <>
        {Icon && (
          <IconContainer>
            <Icon />
          </IconContainer>
        )}
        {text && (
          <Text background={background} textColor={textColor}>
            {text}
          </Text>
        )}
        {children ? children : null}
      </>
    )}
  </StyledButton>
);

export default Button;
