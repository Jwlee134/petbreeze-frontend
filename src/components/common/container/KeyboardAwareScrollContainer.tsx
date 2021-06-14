import React, { ReactNode } from "react";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

interface IProps extends KeyboardAwareScrollViewProps {
  children: ReactNode;
}

const KeyboardAwareScrollContainer = ({ children, ...props }: IProps) => {
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareScrollContainer;
