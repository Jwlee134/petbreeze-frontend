import React, { ReactNode, useEffect, useRef } from "react";
import { useCallback } from "react";
import { ScrollView } from "react-native";
import { useAppSelector } from "~/store";
import { width } from "~/styles";
import { isIos } from "~/utils";

const usePagingScrollView = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const page = useAppSelector(state => state.common.page);

  useEffect(() => {
    if (scrollViewRef.current && page) {
      scrollViewRef.current.scrollTo({
        x: width * page,
        animated: true,
      });
    }
  }, [page]);

  const PagingScrollView = useCallback(
    ({ children }: { children: ReactNode }) => (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: isIos ? 24 : 0 }}>
        {children}
      </ScrollView>
    ),
    [],
  );

  return { PagingScrollView };
};

export default usePagingScrollView;
