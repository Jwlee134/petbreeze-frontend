import React, { useState } from "react";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import CheckListItem from "~/components/deleteAccount/CheckListItem";
import { rpWidth } from "~/styles";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  padding: 0px ${rpWidth(32)}px;
`;

const reasons = [
  "위치 정보가 정확하지 않아요.",
  "앱 오류가 있어요.",
  "개인정보가 걱정돼요.",
  "앱 용량이 너무 커요.",
  "서비스 이용이 불편해요.",
];

const DeleteAccountFirstPage = ({ navigation }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Container>
      <TextContainer>
        <MyText
          style={{ marginTop: rpWidth(10), marginBottom: rpWidth(43) }}
          color="rgba(0, 0, 0, 0.5)"
          fontSize={14}>
          탈퇴 이유를 말씀해주세요.
        </MyText>
        {reasons.map((reason, i) => (
          <CheckListItem
            reason={reason}
            key={i}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </TextContainer>
      <Button
        useBottomInset
        useCommonMarginBottom
        disabled={!selected.length}
        onPress={() => {
          navigation.navigate("DeleteAccountSecondPage");
        }}>
        다음
      </Button>
    </Container>
  );
};

export default DeleteAccountFirstPage;
