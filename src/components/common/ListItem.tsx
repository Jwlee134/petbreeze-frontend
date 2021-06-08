import React, { ReactNode } from "react";
import styled, { css } from "styled-components/native";
import palette from "~/styles/palette";

interface IProps {
  children: ReactNode;
  RightIcon?: () => JSX.Element;
  LeftIcon?: () => JSX.Element;
  onPress?: () => void;
  isLastItem?: boolean;
}

const Container = styled.TouchableHighlight<{ isLastItem: boolean }>`
  width: 100%;
  border-radius: 4px;
  background-color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 25px;
  ${({ isLastItem }) =>
    !isLastItem &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${palette.gray_e5};
    `}
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Label = styled.Text`
  font-size: 16px;
  flex: 1;
`;

const LeftIconContainer = styled.View`
  margin-right: 16px;
`;

const RightIconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const ListItem = ({
  children,
  LeftIcon,
  RightIcon,
  onPress,
  isLastItem = false,
}: IProps) => (
  <Container
    onPress={onPress}
    underlayColor={palette.gray_f3}
    isLastItem={isLastItem}>
    <>
      <LeftContainer>
        {LeftIcon && (
          <LeftIconContainer>
            <LeftIcon />
          </LeftIconContainer>
        )}
        <Label numberOfLines={1}>{children}</Label>
      </LeftContainer>
      {RightIcon && (
        <RightIconContainer>
          <RightIcon />
        </RightIconContainer>
      )}
    </>
  </Container>
);

export default ListItem;
