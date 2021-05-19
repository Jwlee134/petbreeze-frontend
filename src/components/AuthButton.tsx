import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

type AuthType = "kakao" | "facebook";

interface IButton extends TouchableOpacityProps {
  type: AuthType;
  children: ReactNode;
}

const Container = styled.TouchableOpacity<{ type: AuthType }>`
  padding: 10px 0px;
  width: 284px;
  border-radius: 15px;
  background-color: ${({ type }) =>
    type === "facebook" ? palette.facebook_blue : palette.kakao_yellow};
`;

const ButtonText = styled.Text<{ type: AuthType }>`
  font-size: 14px;
  text-align: center;
  color: ${({ type }) => (type === "facebook" ? "white" : "black")};
`;

const AuthButton = ({ type, children, ...props }: IButton) => (
  <Container type={type} activeOpacity={0.9} {...props}>
    <ButtonText type={type}>{children}</ButtonText>
  </Container>
);

export default AuthButton;
