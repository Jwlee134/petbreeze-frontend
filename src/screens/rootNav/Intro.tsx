import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import FirstIntro from "~/components/intro/FirstIntro";
import PageIndicatorCircle from "~/components/intro/PageIndicatorCircle";
import SecondIntro from "~/components/intro/SecondIntro";
import ThirdIntro from "~/components/intro/ThirdIntro";
import { DimensionsContext } from "~/context/DimensionsContext";
import usePagingFlatList from "~/hooks/usePagingFlatList";
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
  const { PagingFlatList } = usePagingFlatList();
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { width, rpWidth, rpHeight } = useContext(DimensionsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const value = useRef(new Animated.Value(0)).current;

  const color = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "rgba(0, 0, 0, 0.5)"],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: currentPage === 1 ? 0 : 1,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [currentPage]);

  return (
    <>
      <SkipButton
        style={{
          marginTop: rpWidth(18) + top,
          marginRight: rpWidth(20),
          marginLeft: "auto",
        }}
        onPress={() => {
          dispatch(
            storageActions.setInit({
              isIntroPassed: true,
            }),
          );
          navigation.replace("Start");
        }}>
        <MyText fontWeight="medium" fontSize={14} style={{ color }}>
          건너뛰기
        </MyText>
      </SkipButton>
      <PagingFlatList
        onScroll={e =>
          setCurrentPage(
            Math.round((e.nativeEvent.contentOffset.x + width) / width),
          )
        }
        scrollEventThrottle={16}
        scrollEnabled
        data={data}
      />
      <PageIndicator
        style={{
          marginBottom: rpHeight(54) + bottom,
        }}>
        <PageIndicatorCircle isFocused={currentPage === 1} />
        <PageIndicatorCircle isFocused={currentPage === 2} />
        <PageIndicatorCircle isFocused={currentPage === 3} />
      </PageIndicator>
    </>
  );
};

export default Intro;
