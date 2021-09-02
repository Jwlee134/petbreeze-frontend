import React, { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { rpWidth, width } from "~/styles";
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
  useCommonMarginBottom?: boolean;
  useBottomInset?: boolean;
  useInputStyle?: boolean;
  selected?: boolean;
  isRow?: boolean;
}

interface ITouchableOpacity {
  disabled: boolean;
  backgroundColor: string | undefined;
  useInputStyle: boolean;
  selected: boolean;
  isRow: boolean;
}

const StyledButton = styled.TouchableOpacity<ITouchableOpacity>`
  ${({ isRow }) =>
    isRow
      ? css`
          width: auto;
        `
      : css`
          width: ${width - rpWidth(32)}px;
          margin: 0 auto;
        `};
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
  ${({ useInputStyle, selected }) =>
    useInputStyle &&
    css`
      background-color: white;
      border-width: 1px;
      height: ${rpWidth(39)}px;
      margin-bottom: ${rpWidth(15)}px;
      ${selected
        ? {
            borderColor: palette.blue_7b,
          }
        : {
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
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
  useCommonMarginBottom = false,
  useBottomInset = false,
  useInputStyle = false,
  selected = false,
  isRow = false,
  ...props
}: IButton) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <StyledButton
      backgroundColor={backgroundColor}
      useInputStyle={useInputStyle}
      isRow={isRow}
      selected={selected}
      disabled={disabled}
      style={{
        ...(useCommonMarginBottom && {
          marginBottom: useBottomInset ? rpWidth(32) + bottom : rpWidth(32),
        }),
      }}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color="white" size={rpWidth(25)} />
      ) : (
        <>
          {RightIcon && <RightIcon />}
          <MyText
            fontWeight={fontWeight ? fontWeight : "medium"}
            color={
              useInputStyle
                ? selected
                  ? palette.blue_7b
                  : "rgba(0, 0, 0, 0.1)"
                : disabled
                ? "rgba(0, 0, 0, 0.5)"
                : fontColor
                ? fontColor
                : "white"
            }>
            {children}
          </MyText>
        </>
      )}
    </StyledButton>
  );
};

export default Button;
