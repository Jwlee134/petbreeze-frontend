import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import { Platform } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

interface IProps extends KeyboardAwareScrollViewProps {
  children: ReactNode;
}

const KeyboardAwareScrollContainer = ({ children, ...props }: IProps) => {
  const height = useBottomTabBarHeight();

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={Platform.OS === "android" ? 0 : -height}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareScrollContainer;
