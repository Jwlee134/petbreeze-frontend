import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import usePagingFlatList from "~/hooks/usePagingFlatList";
import { storageActions } from "~/store/storage";
import { width, rpWidth } from "~/styles";
import GradientContainer from "../common/container/GradientContainer";
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

  return <GradientContainer></GradientContainer>;
};

export default Intro;
