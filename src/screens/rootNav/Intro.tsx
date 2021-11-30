import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import FirstIntro from "~/components/intro/FirstIntro";
import PageIndicatorCircle from "~/components/intro/PageIndicatorCircle";
import SecondIntro from "~/components/intro/SecondIntro";
import ThirdIntro from "~/components/intro/ThirdIntro";

const PageIndicator = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const data = [<FirstIntro />, <SecondIntro />, <ThirdIntro />];

const Intro = () => {
  const { bottom } = useSafeAreaInsets();

  const [currentPage, setCurrentPage] = useState(1);
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(value, {
      toValue: currentPage === 1 ? 0 : 1,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [currentPage]);

  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();

  return (
    <>
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
        bounces={false}
        keyboardShouldPersistTaps="always"
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScroll={e =>
          setCurrentPage(
            Math.round((e.nativeEvent.contentOffset.x + width) / width),
          )
        }
        scrollEventThrottle={16}
        scrollEnabled
      />
      <PageIndicator
        style={{
          marginBottom: 54 + bottom,
        }}>
        <PageIndicatorCircle isFocused={currentPage === 1} />
        <PageIndicatorCircle isFocused={currentPage === 2} />
        <PageIndicatorCircle isFocused={currentPage === 3} />
      </PageIndicator>
    </>
  );
};

export default Intro;
