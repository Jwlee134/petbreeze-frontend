import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import ShadowContainer from "./container/ShadowContainer";

interface IProps {
  children: ReactNode;
  RightIcon?: () => JSX.Element;
  LeftIcon?: () => JSX.Element;
  onPress?: () => void;
  isLastItem?: boolean;
}

const Container = styled.View<{ isLastItem: boolean }>`
  width: 100%;
  height: 46px;
  margin-top: 13px;
  padding: 0px 11px;
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

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Label = styled.Text`
  font-size: 18px;
  flex: 1;
`;

const LeftIconContainer = styled.View`
  margin-right: 11px;
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
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <ShadowContainer>
      <Container isLastItem={isLastItem}>
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
      </Container>
    </ShadowContainer>
  </TouchableOpacity>
);

export default ListItem;
