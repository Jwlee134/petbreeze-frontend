import React from "react";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { rpWidth } from "~/styles";

interface IProps {
  children: ReactNode;
  width?: "wide";
  style?: StyleProp<ViewStyle>;
}

const SidePaddingContainer = ({ children, width, style }: IProps) => (
  <View
    style={{
      flex: 1,
      paddingHorizontal: width ? rpWidth(36) : rpWidth(16),
      ...(style as object),
    }}>
    {children}
  </View>
);

export default SidePaddingContainer;
