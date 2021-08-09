import React, { ReactNode } from "react";
import {
  SafeAreaView as IOSSafeAreaView,
  StyleProp,
  ViewStyle,
} from "react-native";
import { SafeAreaView as AndroidSafeAreaView } from "react-native-safe-area-context";
import { isAndroid } from "~/utils";

const SafeAreaContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  if (isAndroid) {
    return (
      <AndroidSafeAreaView style={{ flex: 1, ...(style as object) }}>
        {children}
      </AndroidSafeAreaView>
    );
  }
  return (
    <IOSSafeAreaView style={{ flex: 1, ...(style as object) }}>
      {children}
    </IOSSafeAreaView>
  );
};

export default SafeAreaContainer;
