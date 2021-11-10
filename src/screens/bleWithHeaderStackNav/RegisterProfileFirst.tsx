import React, { useContext, useState } from "react";
import { Keyboard, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import SelectableButton from "~/components/common/SelectableButton";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { RegisterProfileFirstScreenNavigationProp } from "~/types/navigator";
import AvatarCircle from "./AvatarCircle";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import DatePicker from "react-native-date-picker";
import { formActions } from "~/store/form";

const InputContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding: 0px ${rpWidth(42)}px;
    margin-top: ${rpWidth(74)}px;
  `}
`;

const AvatarContainer = styled.View`
  margin: 0 auto;
`;

const RegisterProfileFirst = ({
  navigation,
}: {
  navigation: RegisterProfileFirstScreenNavigationProp;
}) => {
  const { name, birthYear, birthMonth, birthDay } = useAppSelector(
    state => state.form,
  );
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);
  const { open, close, modalProps } = useModal();
  const [date, setDate] = useState(
    birthYear ? new Date(birthYear, birthMonth, birthDay) : new Date(),
  );

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View style={{ marginBottom: rpWidth(30) }}>
          <MyText
            style={{
              textAlign: "center",
              marginTop: rpWidth(46),
              marginBottom: rpWidth(65),
            }}
            fontSize={24}>
            프로필을 등록해주세요.
          </MyText>
          <AvatarContainer>
            <AvatarCircle />
          </AvatarContainer>
          <InputContainer rpWidth={rpWidth}>
            <InputTitle>이름</InputTitle>
            <Input
              maxLength={16}
              value={name}
              onChangeText={text =>
                dispatch(formActions.setState({ name: text }))
              }
              containerStyle={{ marginBottom: rpWidth(36) }}
            />
            <InputTitle>생년월일</InputTitle>
            <SelectableButton
              fontColor="rgba(0, 0, 0, 0.8)"
              selected={!!birthYear}
              onPress={open}>
              {birthYear || ""}
              {birthYear ? "년" : ""} {birthMonth || ""}
              {birthYear ? "월" : ""} {birthDay || ""}
              {birthYear ? "일" : ""}
            </SelectableButton>
          </InputContainer>
        </View>
        <Button
          disabled={!name || !birthYear}
          useCommonMarginBottom
          onPress={() => {
            Keyboard.dismiss();
            navigation.navigate("RegisterProfileSecond");
          }}>
          다음
        </Button>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          rightButtonText="확인"
          onRightButtonPress={() => {
            dispatch(
              formActions.setState({
                birthYear: date.getFullYear(),
                birthMonth: date.getMonth() + 1,
                birthDay: date.getDate(),
              }),
            );
            close();
          }}
          close={close}
          style={{ width: rpWidth(300) }}>
          <DatePicker
            style={{
              width: rpWidth(300),
            }}
            date={date}
            onDateChange={setDate}
            mode="date"
            maximumDate={new Date()}
          />
        </CommonCenterModal>
      </Modal>
    </>
  );
};

export default RegisterProfileFirst;
