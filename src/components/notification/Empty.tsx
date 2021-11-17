import React, { useContext } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import Dog from "~/assets/svg/dog/dog-bell.svg";
import {
  DimensionsContext,
  RpHeight,
  RpWidth,
} from "~/context/DimensionsContext";
import MyText from "../common/MyText";

const Svg = styled.View<{ rpWidth: RpWidth; rpHeight: RpHeight }>`
  margin-left: auto;
  margin-right: ${({ rpWidth }) => rpWidth(46)}px;
  margin-bottom: ${({ rpHeight }) => rpHeight(62)}px;
`;

const Empty = () => {
  const { rpWidth, rpHeight } = useContext(DimensionsContext);

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1 }}>
      <MyText
        style={{
          textAlign: "center",
          marginTop: rpHeight(124),
          marginBottom: rpHeight(62),
        }}
        fontSize={18}
        fontWeight="light"
        color="rgba(0, 0, 0, 0.5)">
        아직 알림이 없습니다.{"\n"}활동을 시작해보세요!
      </MyText>
      <Svg rpWidth={rpWidth} rpHeight={rpHeight}>
        <Dog width={rpWidth(246)} height={rpHeight(298)} />
      </Svg>
    </ScrollView>
  );
};

export default Empty;
