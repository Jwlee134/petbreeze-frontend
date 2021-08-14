import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import DropShadow from "react-native-drop-shadow";

interface IProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  shadowOpacity?: number;
  shadowRadius?: number;
}

const ShadowContainer = ({
  children,
  style,
  shadowOpacity,
  shadowRadius,
}: IProps) => (
  <DropShadow
    style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: shadowOpacity ?? 0.25,
      shadowRadius: shadowRadius ?? 3,
      ...(style as object),
    }}>
    {children}
  </DropShadow>
);

export default ShadowContainer;
