import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import Dissolve from "../common/Dissolve";
import CustomHeader from "../navigator/CustomHeader";

const TopInset = styled.View`
  background-color: white;
`;

const WalkMapHeader = () => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const { top } = useSafeAreaInsets();

  return (
    <Dissolve
      isVisible={!isStopped}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}>
      <TopInset style={{ height: top }} />
      <CustomHeader disableBackButton>산책하기</CustomHeader>
    </Dissolve>
  );
};

export default WalkMapHeader;
