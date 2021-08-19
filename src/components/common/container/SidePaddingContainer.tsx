import React from "react";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { rpWidth } from "~/styles";

interface IProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SidePaddingContainer = ({ children, style }: IProps) => (
  <View
    style={{
      paddingHorizontal: rpWidth(16),
      ...(style as object),
    }}>
    {children}
  </View>
);

export default SidePaddingContainer;
