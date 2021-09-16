import React, { ReactNode } from "react";
import { StatusBar, StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientContainer = ({
  children,
  style,
  isBlackStatusBar = false,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isBlackStatusBar?: boolean;
}) => (
  <>
    {!isBlackStatusBar ? (
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
    ) : null}
    <LinearGradient
      style={{ flex: 1, ...(style as object) }}
      colors={["#6367C8", "#944DD7"]}>
      {children}
    </LinearGradient>
  </>
);

export default GradientContainer;
