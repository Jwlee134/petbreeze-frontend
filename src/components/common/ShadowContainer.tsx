import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import DropShadow from "react-native-drop-shadow";

const ShadowContainer = ({
  children,
  shadowContainerStyle,
}: {
  children: ReactNode;
  shadowContainerStyle?: StyleProp<ViewStyle>;
}) => (
  <DropShadow
    style={{
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      ...(shadowContainerStyle as object),
    }}>
    {children}
  </DropShadow>
);

export default ShadowContainer;
