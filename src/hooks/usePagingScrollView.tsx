import React, { ReactNode, useEffect, useRef } from "react";
import { useCallback } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useAppSelector } from "~/store";
import { width } from "~/styles";
import { isIos } from "~/utils";

interface IProps extends ScrollViewProps {
  children: ReactNode;
}

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

  return { PagingScrollView };
};

export default usePagingScrollView;
