import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

const InfoText = styled.Text`
  font-size: 15px;
  text-align: center;
  margin-top: 15px;
`;

const LocationCollectInterval = () => {
  return (
    <ScrollView>
      <SidePaddingContainer>
        <InfoText>
          위치정보 수집주기는{"\n"} 짧을수록 배터리가 더 빨리 방전되니
          참고해주세요.
        </InfoText>
      </SidePaddingContainer>
    </ScrollView>
  );
};

export default LocationCollectInterval;
