import React, { ReactNode } from "react";
import { Platform, SafeAreaView as IOSSafeAreaView } from "react-native";
import { SafeAreaView as AndroidSafeAreaView } from "react-native-safe-area-context";

const SafeAreaContainer = ({
  children,
  hasCustomHeader = true,
}: {
  children: ReactNode;
  hasCustomHeader?: boolean;
}) => {
  if (Platform.OS === "android" && hasCustomHeader) {
    return (
      <AndroidSafeAreaView style={{ flex: 1 }}>{children}</AndroidSafeAreaView>
    );
  }
  return <IOSSafeAreaView style={{ flex: 1 }}>{children}</IOSSafeAreaView>;
};

export default SafeAreaContainer;
