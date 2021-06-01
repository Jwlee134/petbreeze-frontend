import React from "react";
import styled from "styled-components/native";

import Ionicons from "react-native-vector-icons/Ionicons";

const Container = styled.View``;

const Text = styled.Text`
  font-size: 17px;
  margin-left: 15px;
  flex-shrink: 1;
  line-height: 24px;
`;

const RowContainer = styled.View<{ isLast?: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ isLast }) => (isLast ? "0px" : "18px")};
`;

const SafetyZoneModal = () => (
  <Container>
    <RowContainer>
      <Ionicons name="checkmark" size={24} />
      <Text>안심존을 최대 3개까지 설정하실 수 있습니다.</Text>
    </RowContainer>
    <RowContainer>
      <Ionicons name="checkmark" size={24} />
      <Text>안심존 이탈시 자동으로 유저에게 알림이 전송됩니다.</Text>
    </RowContainer>
    <RowContainer isLast>
      <Ionicons name="checkmark" size={24} />
      <Text>
        실내 및 지하에서 실제 위치와의 오차가 크게 나타날 수 있습니다.
      </Text>
    </RowContainer>
  </Container>
);

export default SafetyZoneModal;
