import React, { ReactNode, useEffect, useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { ScrollView, ScrollViewProps, View } from "react-native";
import { width } from "~/styles";

interface IProps extends ScrollViewProps {
  children: ReactNode;
}

const usePagingScrollView = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  const next = () => setPage(prev => prev + 1);

  const prev = () => setPage(prev => prev - 1);

  useEffect(() => {
    if (scrollViewRef.current && page) {
      scrollViewRef.current.scrollTo({
        x: width * page,
        animated: true,
      });
    }
  }, [page]);

  const PagingScrollView = useCallback(
    ({ children, ...props }: IProps) => (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        {...props}>
        {children}
      </ScrollView>
    ),
    [],
  );

  const ScreenWidthContainer = useCallback(
    ({ children }: { children: ReactNode }) => (
      <View style={{ width }}>{children}</View>
    ),
    [],
  );

  return { PagingScrollView, ScreenWidthContainer, next, prev };
};

export default usePagingScrollView;
