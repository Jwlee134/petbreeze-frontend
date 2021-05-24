import React from "react";
import styled from "styled-components/native";

import Heart from "~/assets/svg/heart-red.svg";
import My from "~/assets/svg/my.svg";
import Alert from "~/assets/svg/alert.svg";

import ModalText from "./ModalText";

const Container = styled.View``;

const Item = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

const ItemText = styled.Text`
  margin-left: 25px;
  font-size: 17px;
`;

const NotificationModal = () => (
  <Container>
    <Item>
      <Heart />
      <ItemText>저장한 게시물 업데이트</ItemText>
    </Item>
    <Item>
      <My />
      <ItemText>작성한 게시물 업데이트</ItemText>
    </Item>
    <Item>
      <Alert />
      <ItemText>내 주위의 실종신고 업데이트</ItemText>
    </Item>
    <ModalText>알림을 받아볼 수 있습니다.</ModalText>
  </Container>
);

export default NotificationModal;
