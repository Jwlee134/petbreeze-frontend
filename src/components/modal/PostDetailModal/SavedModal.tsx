import React from "react";
import styled from "styled-components/native";
import ModalText from "../ModalText";

const Container = styled.View``;

const SavedModal = () => (
  <Container>
    <ModalText style={{ lineHeight: 30 }}>
      저장된 게시물은 My Menu 탭에서{"\n"} 확인하실 수 있습니다.
    </ModalText>
  </Container>
);

export default SavedModal;
