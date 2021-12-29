import React, { forwardRef, useImperativeHandle } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import CheckCircle from "~/components/common/CheckCircle";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import { commonActions } from "~/store/common";
import { MIN_SPACE } from "~/styles/constants";
import { DeleteAccountFirstPageScreenNavigationProp } from "~/types/navigator";

const Item = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  height: 54px;
  align-items: center;
  padding: 0 32px;
`;

const InputContainer = styled.View`
  padding: 0 32px;
`;

const reasons = [
  "위치 정보가 정확하지 않아요.",
  "앱 오류가 있어요.",
  "개인정보가 걱정돼요.",
  "앱 용량이 너무 커요.",
  "서비스 이용이 불편해요.",
];

export interface DeleteAccountFirstGoBack {
  goBack: () => void;
}

interface Props {
  navigation: DeleteAccountFirstPageScreenNavigationProp;
}

const DeleteAccountFirstPage = forwardRef<DeleteAccountFirstGoBack, Props>(
  ({ navigation }, ref) => {
    useImperativeHandle(ref, () => ({
      goBack: () => navigation.goBack(),
    }));
    const { body, text } = useAppSelector(state => state.common.deleteAccount);
    const dispatch = useDispatch();

    const onReasonClick = (i: number) => {
      if (body.includes(i)) {
        dispatch(
          commonActions.setDeleteAccount({
            body: body.filter(num => num !== i),
          }),
        );
      } else {
        dispatch(commonActions.setDeleteAccount({ body: [...body, i] }));
      }
    };

    const onChangeText = (text: string) => {
      dispatch(commonActions.setDeleteAccount({ text }));
    };

    const onPress = () => {
      if (text) {
        const filtered = body.filter(item => typeof item === "number");
        dispatch(commonActions.setDeleteAccount({ body: [...filtered, text] }));
      }
      navigation.navigate("DeleteAccountSecondPage");
    };

    return (
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View>
          {reasons.map((reason, i) => (
            <Item
              key={i}
              style={{
                ...(i === reasons.length - 1 && { marginBottom: 13.5 }),
              }}
              onPress={() => onReasonClick(i)}>
              <MyText>{reason}</MyText>
              <CheckCircle selected={body.includes(i)} />
            </Item>
          ))}
          <InputContainer>
            <Input
              value={text}
              onChangeText={onChangeText}
              placeholder="직접 입력"
              multiline
              scrollEnabled={false}
              textAlignVertical="top"
              style={{ paddingHorizontal: 0 }}
              hasBorder={false}
              placeholderTextColor="rgba(0, 0, 0, 0.8)"
            />
          </InputContainer>
        </View>
        <Button
          style={{ marginTop: MIN_SPACE }}
          useCommonMarginBottom
          disabled={!body.length && !text}
          onPress={onPress}>
          다음
        </Button>
      </KeyboardAwareScrollContainer>
    );
  },
);

export default DeleteAccountFirstPage;
