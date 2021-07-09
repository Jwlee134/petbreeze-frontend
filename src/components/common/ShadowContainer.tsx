import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import DropShadow from "react-native-drop-shadow";

const ShadowContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => (
  <DropShadow
    style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      ...(style as object),
    }}>
    {children}
  </DropShadow>
);

export default ShadowContainer;
