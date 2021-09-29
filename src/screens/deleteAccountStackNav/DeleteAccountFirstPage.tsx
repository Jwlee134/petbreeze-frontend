import React, { useContext, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import CheckCircle from "~/components/common/CheckCircle";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { DeleteAccountFirstPageScreenNavigationProp } from "~/types/navigator";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TextContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(32)}px`};
`;

const Item = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  flex-direction: row;
  padding-bottom: ${({ rpWidth }) => rpWidth(27)}px;
  justify-content: space-between;
`;

const reasons = [
  "위치 정보가 정확하지 않아요.",
  "앱 오류가 있어요.",
  "개인정보가 걱정돼요.",
  "앱 용량이 너무 커요.",
  "서비스 이용이 불편해요.",
];

const DeleteAccountFirstPage = ({
  navigation,
}: {
  navigation: DeleteAccountFirstPageScreenNavigationProp;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container>
      <TextContainer rpWidth={rpWidth}>
        <MyText
          style={{ marginTop: rpWidth(10), marginBottom: rpWidth(43) }}
          color="rgba(0, 0, 0, 0.5)"
          fontSize={14}>
          탈퇴 이유를 말씀해주세요.
        </MyText>
        {reasons.map((reason, i) => (
          <Item
            key={i}
            rpWidth={rpWidth}
            onPress={() => {
              if (selected.includes(reason)) {
                setSelected(selected.filter(item => item !== reason));
              } else {
                setSelected([...selected, reason]);
              }
            }}>
            <MyText>{reason}</MyText>
            <CheckCircle selected={selected.includes(reason)} />
          </Item>
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
