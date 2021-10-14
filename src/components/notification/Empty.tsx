import React, { useContext } from "react";
import styled from "styled-components/native";
import Dog from "~/assets/svg/dog/dog-bell.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import MyText from "../common/MyText";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Svg = styled.View<{ rpWidth: RpWidth }>`
  margin-left: auto;
  margin-right: ${({ rpWidth }) => rpWidth(46)}px;
  margin-bottom: ${({ rpWidth }) => rpWidth(62)}px;
`;

const Empty = () => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container>
      <MyText
        style={{ textAlign: "center", marginTop: rpWidth(124) }}
        fontSize={18}
        fontWeight="light"
        color="rgba(0, 0, 0, 0.5)">
        아직 알림이 없습니다.{"\n"}활동을 시작해보세요!
      </MyText>
      <Svg rpWidth={rpWidth}>
        <Dog width={rpWidth(246)} height={rpWidth(298)} />
      </Svg>
    </Container>
  );
};

export default Empty;
