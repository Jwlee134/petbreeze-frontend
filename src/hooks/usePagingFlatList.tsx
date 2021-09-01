import React, { useEffect, useRef, useState, useCallback } from "react";
import { FlatList, FlatListProps, View } from "react-native";
import { width } from "~/styles";

interface IProps extends Partial<FlatListProps<JSX.Element>> {
  data: JSX.Element[];
  scrollEnabled?: boolean;
}

const usePagingFlatList = ({ initialIndex = 0 } = {}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const next = useCallback(() => setCurrentIndex(prev => prev + 1), []);
  const prev = useCallback(() => setCurrentIndex(prev => prev - 1), []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex });
    }
  }, [currentIndex]);

  const PagingFlatList = useCallback(
    ({ data, scrollEnabled = false, ...props }: IProps) => (
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => <View style={{ width }}>{item}</View>}
        keyExtractor={(item, index) => `key-${index}`}
        horizontal
        pagingEnabled
        initialNumToRender={1}
        windowSize={3} // 현재 화면 포함 앞 뒤로 렌더링할 화면 개수
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        bounces={false}
        keyboardShouldPersistTaps="always"
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={initialIndex}
        {...props}
      />
    ),
    [],
  );

  return { PagingFlatList, next, prev };
};

export default usePagingFlatList;
