import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import Divider from "../common/Divider";
import MyText from "../common/MyText";

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 50px;
`;

interface Props extends TouchableOpacityProps {
  title: string;
  isLast?: boolean;
  color: "blue" | "red";
}

const IosBottomModalButton = ({
  title,
  isLast = false,
  color,
  ...props
}: Props) => {
  return (
    <>
      <Button {...props}>
        <MyText color={color === "blue" ? palette.blue_7b : palette.red_f0}>
          {title}
        </MyText>
      </Button>
      {!isLast && <Divider />}
    </>
  );
};

export default IosBottomModalButton;
