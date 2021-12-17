import React, { useContext, useRef, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import FirstIntro from "~/components/intro/FirstIntro";
import PageIndicatorCircle from "~/components/intro/PageIndicatorCircle";
import SecondIntro from "~/components/intro/SecondIntro";
import ThirdIntro from "~/components/intro/ThirdIntro";
import { DimensionsContext } from "~/context/DimensionsContext";
import { storageActions } from "~/store/storage";
import { IntroScreenNavigationProp } from "~/types/navigator";

const SkipButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  z-index: 1;
`;

const PageIndicator = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const data = [<FirstIntro />, <SecondIntro />, <ThirdIntro />];

const Intro = ({ navigation }: { navigation: IntroScreenNavigationProp }) => {
  const { top, bottom } = useSafeAreaInsets();
  const { rpHeight } = useContext(DimensionsContext);
  const [currentPage, setCurrentPage] = useState(0);
  const value = useDerivedValue(() =>
    withTiming(currentPage, { duration: 200 }),
  );

  const color = useAnimatedStyle(() => ({
    color: interpolateColor(
      value.value,
      [0, 1, 2],
      ["white", "rgba(0, 0, 0, 0.5)", "white"],
    ),
  }));

  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <>
      <SkipButton
        style={{ marginTop: 18 + top, marginRight: 20, marginLeft: "auto" }}
        onPress={() => {
          dispatch(storageActions.setInit({ isIntroPassed: true }));
          navigation.replace("Start");
        }}>
        <MyText fontWeight="medium" fontSize={14} animatedStyle={color}>
          건너뛰기
        </MyText>
      </SkipButton>
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
            Math.round((e.nativeEvent.contentOffset.x + width) / width) - 1,
          )
        }
        scrollEventThrottle={16}
        scrollEnabled
      />
      <PageIndicator style={{ marginBottom: rpHeight(54) + bottom }}>
        <PageIndicatorCircle isFocused={currentPage === 0} />
        <PageIndicatorCircle isFocused={currentPage === 1} />
        <PageIndicatorCircle isFocused={currentPage === 2} />
      </PageIndicator>
    </>
  );
};

export default Intro;
