import React from "react";
import styled from "styled-components/native";
import { hiddenButtonWidth } from "~/styles/constants";
import Minus from "~/assets/svg/minus/minus-white.svg";
import palette from "~/styles/palette";

const Button = styled.TouchableOpacity`
  width: ${hiddenButtonWidth}px;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${palette.red_f0};
  align-self: flex-end;
`;

const HiddenButton = ({ onPress }: { onPress: () => void }) => (
  <Button onPress={onPress}>
    <Minus />
  </Button>
);

export default HiddenButton;
