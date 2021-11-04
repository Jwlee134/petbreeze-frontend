import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import CheckCircle from "~/components/common/CheckCircle";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { commonActions } from "~/store/common";
import { DeleteAccountFirstPageScreenNavigationProp } from "~/types/navigator";
import { isAndroid } from "~/utils";

const TextContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(32)}px`};
`;

const Item = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  flex-direction: row;
  margin-bottom: ${({ rpWidth }) => rpWidth(27)}px;
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
  const { rpWidth } = useContext(DimensionsContext);
  const { body, text } = useAppSelector(state => state.common.deleteAccount);
  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <TextContainer rpWidth={rpWidth}>
        {reasons.map((reason, i) => (
          <Item
            key={i}
            rpWidth={rpWidth}
            onPress={() => {
              if (body.includes(i)) {
                dispatch(
                  commonActions.setDeleteAccount({
                    body: body.filter(num => num !== i),
                  }),
                );
              } else {
                dispatch(
                  commonActions.setDeleteAccount({
                    body: [...body, i],
                  }),
                );
              }
            }}>
            <MyText>{reason}</MyText>
            <CheckCircle selected={body.includes(i)} />
          </Item>
        ))}
        <Input
          value={text}
          onChangeText={text => {
            dispatch(
              commonActions.setDeleteAccount({
                text,
              }),
            );
          }}
          placeholder="직접 입력"
          multiline
          scrollEnabled={false}
          style={{
            paddingHorizontal: 0,
            marginBottom: isAndroid ? rpWidth(50) : 0,
          }}
          hasBorder={false}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
        />
      </TextContainer>
      <Button
        useCommonMarginBottom
        disabled={!body.length}
        onPress={() => {
          if (text) {
            const filtered = body.filter(item => typeof item === "number");
            dispatch(
              commonActions.setDeleteAccount({
                body: [...filtered, text],
              }),
            );
          }
          navigation.navigate("DeleteAccountSecondPage");
        }}>
        다음
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default DeleteAccountFirstPage;
