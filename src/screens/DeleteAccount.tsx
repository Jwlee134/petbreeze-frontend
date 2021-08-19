import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { rpWidth } from "~/styles";

import CheckFill from "~/assets/svg/common/check-circle-fill.svg";
import Check from "~/assets/svg/common/check-circle.svg";
import Dog from "~/assets/svg/dog-crying.svg";
import { useState } from "react";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Button from "~/components/common/Button";
import palette from "~/styles/palette";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  padding: 0px ${rpWidth(32)}px;
`;

const TitleContainer = styled.View`
  margin: ${rpWidth(50)}px 0px;
`;

const Selector = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${rpWidth(24)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const reasons = [
  "위치 정보가 정확하지 않아요.",
  "앱 오류가 있어요.",
  "개인정보가 걱정돼요.",
  "앱 용량이 너무 커요.",
  "서비스 이용이 불편해요.",
];

const DeleteAccount = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <Container>
      <TextContainer>
        <TitleContainer>
          <MyText fontSize={20}>어디개를 탈퇴하시나요?</MyText>
          <MyText
            style={{ marginTop: rpWidth(10) }}
            color="rgba(0, 0, 0, 0.5)"
            fontSize={14}>
            {!isConfirm
              ? "탈퇴 이유를 말씀해주세요."
              : "탈퇴 전 아래 유의사항을 확인해주세요."}
          </MyText>
        </TitleContainer>
        {!isConfirm ? (
          reasons.map((reason, i) => (
            <Selector
              onPress={() => {
                if (selected.includes(reason)) {
                  setSelected(selected.filter(item => item !== reason));
                } else {
                  setSelected([...selected, reason]);
                }
              }}
              key={i}>
              <MyText>{reason}</MyText>
              {selected.includes(reason) ? (
                <CheckFill width={rpWidth(25)} height={rpWidth(25)} />
              ) : (
                <Check width={rpWidth(25)} height={rpWidth(25)} />
              )}
            </Selector>
          ))
        ) : (
          <>
            <RowContainer style={{ marginBottom: rpWidth(25) }}>
              <MyText
                color={palette.blue_7b}
                style={{ marginHorizontal: rpWidth(12) }}>
                •
              </MyText>
              <MyText>
                2개월간 동일한 휴대폰 번호나 이메일 주소로 재가입이
                불가능합니다.
              </MyText>
            </RowContainer>
            <RowContainer>
              <MyText
                color={palette.blue_7b}
                style={{ marginHorizontal: rpWidth(12) }}>
                •
              </MyText>
              <MyText>
                그동안의 활동 내역과 정보가 폐기되며, 복구가 불가능합니다.
              </MyText>
            </RowContainer>
          </>
        )}
      </TextContainer>
      <SidePaddingContainer>
        {isConfirm && (
          <Dog
            width={rpWidth(133)}
            height={rpWidth(129)}
            style={{
              marginBottom: rpWidth(51),
              alignSelf: "flex-end",
              marginRight: rpWidth(34),
            }}
          />
        )}
        <Button
          onPress={() => {
            if (!isConfirm) {
              setIsConfirm(true);
            } else {
              // delete api
            }
          }}
          disabled={!selected.length}
          useCommonMarginBottom
          useBottomInset>
          {!isConfirm ? "다음" : "확인 및 탈퇴"}
        </Button>
      </SidePaddingContainer>
    </Container>
  );
};

export default DeleteAccount;
