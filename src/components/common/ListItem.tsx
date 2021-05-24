import React, { ReactNode } from "react";
import styled, { css } from "styled-components/native";
import ShadowContainer from "./ShadowContainer";

interface IProps {
  children: ReactNode;
  RightIcon?: () => JSX.Element;
  LeftIcon?: () => JSX.Element;
  onPress: () => void;
  isLastItem?: boolean;
}

interface ILeftContainerProps {
  noLeftIcon: boolean;
  noRightIcon: boolean;
}

const Button = styled.TouchableOpacity``;

const Container = styled.View<{ isLastItem: boolean }>`
  width: 100%;
  height: 46px;
  margin-top: 13px;
  border-radius: 4px;
  background-color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  ${({ isLastItem }) =>
    isLastItem &&
    css`
      margin-bottom: 13px;
    `}
`;

const LeftContainer = styled.View<ILeftContainerProps>`
  flex-direction: row;
  align-items: center;
  flex: 1;
  ${({ noRightIcon }) =>
    noRightIcon &&
    css`
      margin-right: 11px;
    `}
  ${({ noLeftIcon }) =>
    noLeftIcon &&
    css`
      margin-left: 11px;
    `}
`;

const Label = styled.Text`
  font-size: 18px;
  flex: 1;
`;

const LeftIconContainer = styled.View`
  margin: 0px 10px;
`;

const RightIconContainer = styled.View`
  width: 42px;
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
  <Button onPress={onPress} activeOpacity={0.8}>
    <ShadowContainer>
      <Container isLastItem={isLastItem}>
        <LeftContainer noLeftIcon={!LeftIcon} noRightIcon={!RightIcon}>
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
      </Container>
    </ShadowContainer>
  </Button>
);

export default ListItem;
