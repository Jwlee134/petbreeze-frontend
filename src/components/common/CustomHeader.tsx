import React, { ReactNode } from "react";
import styled, { css } from "styled-components/native";

interface IProps {
  children: ReactNode;
  size: "big" | "small";
  RightIcon?: () => JSX.Element;
  RightIconOnPress?: () => void;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 28px 0px;
  width: 100%;
`;

const Block = styled.View`
  width: 33.33%;
  justify-content: center;
`;

const TextContainer = styled(Block)`
  align-items: center;
`;

const HeaderText = styled.Text<{ size: "big" | "small" }>`
  font-size: ${({ size }) => (size === "big" ? "36px" : "24px")};
  text-align: center;
`;

const RightIconContainer = styled.View`
  align-items: flex-end;
  margin-right: 25px;
  justify-content: center;
`;

const Button = styled.TouchableOpacity``;

const CustomHeader = ({
  children,
  size,
  RightIcon,
  RightIconOnPress,
}: IProps) => (
  <Container>
    <Block />
    <TextContainer>
      <HeaderText size={size}>{children}</HeaderText>
    </TextContainer>
    <Block>
      {RightIcon && (
        <RightIconContainer>
          <Button onPress={RightIconOnPress} activeOpacity={0.5}>
            <RightIcon />
          </Button>
        </RightIconContainer>
      )}
    </Block>
  </Container>
);

export default CustomHeader;
