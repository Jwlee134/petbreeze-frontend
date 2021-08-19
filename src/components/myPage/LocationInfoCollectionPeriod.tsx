import React from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";
import Location from "~/assets/svg/myPage/location.svg";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: ${rpWidth(48)}px;
  align-items: center;
`;

const Container = styled(RowContainer)`
  height: ${rpWidth(88)}px;
`;

const LocationInfoCollectionPeriod = () => {
  return (
    <Container>
      <RowContainer>
        <SvgContainer>
          <Location width={rpWidth(16)} height={rpWidth(20)} />
        </SvgContainer>
        <MyText>위치정보 수신 주기</MyText>
      </RowContainer>
    </Container>
  );
};

export default LocationInfoCollectionPeriod;
