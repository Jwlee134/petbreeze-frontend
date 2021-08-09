import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import { storageActions } from "~/store/storage";
import { width, rpWidth, rpHeight } from "~/styles";
import FirstIntro from "./FirstIntro";
import PageIndicatorCircle from "./PageIndicatorCircle";
import SecondIntro from "./SecondIntro";
import ThirdIntro from "./ThirdIntro";

const SkipButton = styled.TouchableOpacity<{ top: number }>`
  margin: ${({ top }) =>
    `${rpHeight(20) + top}px ${rpWidth(26)}px ${rpHeight(40)}px auto`};
  position: absolute;
  right: 0;
  z-index: 1;
`;

const PageIndicator = styled.View`
  width: ${width}px;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

const Intro = () => {
  const { PagingScrollView } = usePagingScrollView();
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <SkipButton
        top={top}
        onPress={() => dispatch(storageActions.setInit("intro"))}>
        <MyText
          fontWeight="medium"
          fontSize={17}
          style={{
            opacity: 0.5,
          }}>
          건너뛰기
        </MyText>
      </SkipButton>
      <PagingScrollView
        contentContainerStyle={{
          paddingTop: rpHeight(84) + top,
        }}
        onScroll={e =>
          setCurrentPage(
            Math.round((e.nativeEvent.contentOffset.x + width) / width),
          )
        }
        scrollEventThrottle={16}>
        <FirstIntro />
        <SecondIntro />
        <ThirdIntro />
      </PagingScrollView>
      <PageIndicator
        style={{
          marginBottom: rpHeight(60) + bottom,
        }}>
        <PageIndicatorCircle isFocused={currentPage === 1} />
        <PageIndicatorCircle isFocused={currentPage === 2} />
        <PageIndicatorCircle isFocused={currentPage === 3} />
      </PageIndicator>
    </>
  );
};

export default Intro;
