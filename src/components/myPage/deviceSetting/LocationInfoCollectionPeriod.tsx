import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import MyText from "../../common/MyText";
import Location from "~/assets/svg/myPage/location.svg";
import ScrollPicker from "../../common/ScrollPicker";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(48)}px;
  align-items: center;
`;

const Container = styled(RowContainer)<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(79)}px;
  padding: ${({ rpWidth }) => `0px ${rpWidth(16)}px`};
  justify-content: space-between;
`;

const data = ["5분", "10분", "30분"];

const LocationInfoCollectionPeriod = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container rpWidth={rpWidth}>
      <RowContainer>
        <SvgContainer rpWidth={rpWidth}>
          <Location width={rpWidth(16)} height={rpWidth(20)} />
        </SvgContainer>
        <MyText>위치정보 수신 주기</MyText>
      </RowContainer>
      <ScrollPicker
        data={data}
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}
        width={rpWidth(88)}
        height={rpWidth(36)}
        style={{ marginRight: rpWidth(16) }}
      />
    </Container>
  );
};

export default LocationInfoCollectionPeriod;
