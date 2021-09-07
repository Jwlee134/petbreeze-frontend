import React, { ReactNode } from "react";
import { StatusBar, StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => (
  <>
    <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor="transparent"
    />
    <LinearGradient
      style={{ flex: 1, ...(style as object) }}
      colors={["#6367C8", "#944DD7"]}>
      {children}
    </LinearGradient>
  </>
);

export default GradientContainer;
