import React from "react";
import styled from "styled-components/native";
import { HIDDEN_BUTTON_WIDTH } from "~/styles/constants";
import Minus from "~/assets/svg/minus/minus-white.svg";
import palette from "~/styles/palette";

const Button = styled.TouchableOpacity`
  width: ${HIDDEN_BUTTON_WIDTH}px;
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
