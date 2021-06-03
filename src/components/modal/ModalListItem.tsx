import React, { ReactNode } from "react";
import { TouchableHighlightProps } from "react-native";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

interface IProps extends TouchableHighlightProps {
  children: ReactNode;
  isLast?: boolean;
}

const Button = styled.TouchableHighlight<{ isLast?: boolean }>`
  width: 100%;
  height: 46px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ isLast }) =>
    !isLast &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${palette.gray_f3};
    `};
`;

const ModalListItem = ({ children, isLast, ...props }: IProps) => (
  <Button isLast={isLast} underlayColor={palette.gray_f3} {...props}>
    <>{children}</>
  </Button>
);

export default ModalListItem;
