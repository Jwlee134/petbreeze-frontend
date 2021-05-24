import React, { ReactNode } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface IProps extends ViewProps {
  children: ReactNode;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const ModalButtonContainer = ({ children, ...props }: IProps) => (
  <Container {...props}>{children}</Container>
);

export default ModalButtonContainer;
