import React, { ReactNode } from "react";
import { Platform, SafeAreaView as IOSSafeAreaView } from "react-native";
import { SafeAreaView as AndroidSafeAreaView } from "react-native-safe-area-context";

const SafeAreaContainer = ({ children }: { children: ReactNode }) => {
  if (Platform.OS === "android") {
    return (
      <AndroidSafeAreaView style={{ flex: 1 }}>{children}</AndroidSafeAreaView>
    );
  }
  return <IOSSafeAreaView style={{ flex: 1 }}>{children}</IOSSafeAreaView>;
};

export default SafeAreaContainer;
