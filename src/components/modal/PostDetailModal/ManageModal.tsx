import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";
import ModalListItem from "../ModalListItem";
import ModalText from "../ModalText";

const Container = styled.View``;

const ManageModal = ({ close }: { close: () => void }) => {
  const navigation = useNavigation();

  const handleModify = () => {
    navigation.navigate("PostAnimalInfo");
    close();
  };

  const handleDelete = () => {};

  const handleFound = () => {};

  return (
    <Container>
      <ModalListItem onPress={handleModify}>
        <ModalText>수정하기</ModalText>
      </ModalListItem>
      <ModalListItem onPress={handleDelete}>
        <ModalText>삭제하기</ModalText>
      </ModalListItem>
      <ModalListItem isLast onPress={handleFound}>
        <ModalText>찾았어요</ModalText>
      </ModalListItem>
    </Container>
  );
};

export default ManageModal;
