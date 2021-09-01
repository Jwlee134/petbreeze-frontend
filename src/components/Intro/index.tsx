import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import usePagingFlatList from "~/hooks/usePagingFlatList";
import { storageActions } from "~/store/storage";
import { width, rpWidth } from "~/styles";
import FirstIntro from "./FirstIntro";
import PageIndicatorCircle from "./PageIndicatorCircle";
import SecondIntro from "./SecondIntro";
import ThirdIntro from "./ThirdIntro";

const SkipButton = styled.TouchableOpacity<{ top: number }>`
  margin: ${({ top }) => `${rpWidth(18) + top}px ${rpWidth(20)}px 0 auto`};
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
  z-index: -1;
`;

const data = [<FirstIntro />, <SecondIntro />, <ThirdIntro />];

const Intro = () => {
  const { PagingFlatList } = usePagingFlatList();
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
          fontSize={14}
          style={{
            opacity: 0.5,
          }}>
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
          marginBottom: rpWidth(54) + bottom,
        }}>
        <PageIndicatorCircle isFocused={currentPage === 1} />
        <PageIndicatorCircle isFocused={currentPage === 2} />
        <PageIndicatorCircle isFocused={currentPage === 3} />
      </PageIndicator>
    </>
  );
};

export default Intro;
