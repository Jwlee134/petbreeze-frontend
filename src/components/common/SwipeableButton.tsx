import React, { ReactNode, useContext } from "react";
import { RectButton } from "react-native-gesture-handler";
import { DimensionsContext } from "~/context/DimensionsContext";
import palette from "~/styles/palette";

interface Props {
  children: ReactNode;
  backgroundColor: "red" | "blue";
  onPress: () => void;
}

const SwipeableButton = ({ children, backgroundColor, onPress }: Props) => {
  const { rpWidth } = useContext(DimensionsContext);
  return (
    <RectButton
      onPress={onPress}
      style={{
        width: rpWidth(72),
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          backgroundColor === "red" ? palette.red_f0 : palette.blue_7b_90,
      }}>
      {children}
    </RectButton>
  );
};

export default SwipeableButton;
