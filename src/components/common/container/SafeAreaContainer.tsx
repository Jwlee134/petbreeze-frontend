import React, { ReactNode } from "react";
import { SafeAreaView as IOSSafeAreaView } from "react-native";
import { SafeAreaView as AndroidSafeAreaView } from "react-native-safe-area-context";
import { isAndroid } from "~/utils";

const SafeAreaContainer = ({ children }: { children: ReactNode }) => {
  if (isAndroid) {
    return (
      <AndroidSafeAreaView style={{ flex: 1 }}>{children}</AndroidSafeAreaView>
    );
  }
  return <IOSSafeAreaView style={{ flex: 1 }}>{children}</IOSSafeAreaView>;
};

export default SafeAreaContainer;
