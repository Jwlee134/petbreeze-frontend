import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import Divider from "../common/Divider";

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 50px;
`;

interface Props extends TouchableOpacityProps {
  children: ReactNode;
  isLast?: boolean;
}

const IosBottomModalButton = ({
  children,
  isLast = false,
  ...props
}: Props) => {
  return (
    <>
      <Button {...props}>{children}</Button>
      {!isLast && <Divider />}
    </>
  );
};

export default IosBottomModalButton;
