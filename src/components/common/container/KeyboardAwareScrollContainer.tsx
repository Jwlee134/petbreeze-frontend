import React, { ReactNode } from "react";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IProps extends KeyboardAwareScrollViewProps {
  children: ReactNode;
}

const KeyboardAwareScrollContainer = ({ children, ...props }: IProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      // 수평으로 놓여있는 인풋에 포커스 주면 스크롤 올라가는 현상 해결 위함
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      extraScrollHeight={-bottom + 2}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareScrollContainer;
