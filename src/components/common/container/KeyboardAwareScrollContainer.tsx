import React, { ReactNode } from "react";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IS_IOS } from "~/constants";
import SafeAreaContainer from "./SafeAreaContainer";

interface Props extends KeyboardAwareScrollViewProps {
  children: ReactNode;
  isSpaceBetween?: boolean;
}

// 이미 부모로 Flatlist나 ScrollView가 있다면 꼭 부모 요소에도
// keyboardShoudPersistTap 속성을 설정해야 함
const KeyboardAwareScrollContainer = ({
  children,
  isSpaceBetween = false,
  ...props
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  if (IS_IOS) {
    // SafeAreaView 사용하지 않을 시 키보드가 올라왔을 때 스크롤 내릴 시
    // 하단에 safe area bottom inset 만큼의 빈 공간이 생기고 이것을 없애려
    // extraScrollHeight에 -bottom만큼 설정할 시 인풋으로 정확하게 스크롤이 안 감
    return (
      <SafeAreaContainer>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          // 수평으로 놓여있는 인풋에 포커스 주면 스크롤 올라가는 현상 해결 위함
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          extraScrollHeight={-bottom + 2}
          contentContainerStyle={{
            ...(isSpaceBetween && {
              flexGrow: 1,
              justifyContent: "space-between",
            }),
          }}
          {...props}>
          {children}
        </KeyboardAwareScrollView>
      </SafeAreaContainer>
    );
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        ...(isSpaceBetween && { flexGrow: 1, justifyContent: "space-between" }),
      }}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareScrollContainer;
