import React from "react";
import styled from "styled-components/native";

import Link from "~/assets/svg/link.svg";
import Image from "~/assets/svg/image.svg";
import ModalText from "../ModalText";
import ModalListItem from "../ModalListItem";
import { ModalHeader } from "~/types";
import ModalButtonContainer from "../ModalButtonContainer";
import ModalButton from "~/components/modal/ModalButton";

const Container = styled.View``;

const ShareModal = ({
  modalHeader,
  setModalHeader,
}: {
  modalHeader: ModalHeader;
  setModalHeader: React.Dispatch<React.SetStateAction<ModalHeader>>;
}) => {
  const handleCopy = () => {};

  const handleSave = () => {};

  return (
    <Container>
      {modalHeader !== "전단지 이미지로 저장" ? (
        <>
          <ModalListItem onPress={handleCopy}>
            <Link style={{ marginRight: 8 }} />
            <ModalText>링크 복사</ModalText>
          </ModalListItem>
          <ModalListItem onPress={() => setModalHeader("전단지 이미지로 저장")}>
            <Image style={{ marginRight: 8 }} />
            <ModalText>전단지 이미지로 저장</ModalText>
          </ModalListItem>
        </>
      ) : (
        <>
          <ModalText style={{ lineHeight: 40 }}>
            실종신고를 전단지로 저장하시겠습니까?{"\n"} 이미지는 내 갤러리에
            저장됩니다.
          </ModalText>
          <ModalButtonContainer style={{ marginTop: 16 }}>
            <ModalButton isLeft onPress={() => setModalHeader("공유하기")}>
              뒤로
            </ModalButton>
            <ModalButton onPress={handleSave}>확인</ModalButton>
          </ModalButtonContainer>
        </>
      )}
    </Container>
  );
};

export default ShareModal;
