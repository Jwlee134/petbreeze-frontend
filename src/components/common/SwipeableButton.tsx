import React, { ReactNode } from "react";
import { RectButton } from "react-native-gesture-handler";
import palette from "~/styles/palette";

interface Props {
  children: ReactNode;
  backgroundColor: "red" | "blue";
  onPress: () => void;
}

const SwipeableButton = ({ children, backgroundColor, onPress }: Props) => (
  <RectButton
    onPress={onPress}
    style={{
      width: 72,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        backgroundColor === "red" ? palette.red_f0 : palette.blue_86,
    }}>
    {children}
  </RectButton>
);

export default SwipeableButton;
