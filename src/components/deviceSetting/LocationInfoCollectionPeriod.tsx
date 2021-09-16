import React, { useState } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";
import Location from "~/assets/svg/myPage/location.svg";
import ScrollPicker from "../common/ScrollPicker";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: ${rpWidth(48)}px;
  align-items: center;
`;

const Container = styled(RowContainer)`
  height: ${rpWidth(79)}px;
  justify-content: space-between;
`;

const data = ["1분", "2분", "3분", "5분", "10분", "30분"];

const LocationInfoCollectionPeriod = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);

  return (
    <Container>
      <RowContainer>
        <SvgContainer>
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
      />
    </Container>
  );
};

export default LocationInfoCollectionPeriod;
