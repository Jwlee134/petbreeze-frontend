import React from "react";
import styled from "styled-components/native";

import Link from "~/assets/svg/link.svg";
import Image from "~/assets/svg/image.svg";
import ModalText from "../ModalText";
import ModalListItem from "../ModalListItem";

const Container = styled.View``;

const ShareModal = () => {
  const handleCopy = () => {};

  const handleSave = () => {};

  return (
    <Container>
      <ModalListItem onPress={handleCopy}>
        <Link style={{ marginRight: 8 }} />
        <ModalText>링크 복사</ModalText>
      </ModalListItem>
      <ModalListItem onPress={handleSave}>
        <Image style={{ marginRight: 8 }} />
        <ModalText>전단지 이미지로 저장</ModalText>
      </ModalListItem>
    </Container>
  );
};

export default ShareModal;
