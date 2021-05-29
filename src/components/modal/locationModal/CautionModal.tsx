import React from "react";
import styled from "styled-components/native";
import ModalText from "../ModalText";

const Container = styled.View``;

const CenterContainer = styled.View`
  margin: 18px 0px;
`;

const CautionModal = () => (
  <Container>
    <ModalText>실내와 지하에서는 위치정보 수신이 {"\n"}제한됩니다.</ModalText>
    <CenterContainer>
      <ModalText>
        최초 기기 부팅시 외부에서 진행하셔야 {"\n"}원활한 사용이 가능합니다.
      </ModalText>
    </CenterContainer>
    <ModalText>
      사용중 어려움이 있으시다면 {"\n"}메뉴{">"}고객센터로 문의주세요.
    </ModalText>
  </Container>
);

export default CautionModal;
