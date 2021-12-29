import React, { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import SelectableButton from "~/components/common/SelectableButton";
import { DEFAULT_AVATAR } from "~/constants";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import { MissingReportFirstPageScreenNavigationProp } from "~/types/navigator";
import useModal from "~/hooks/useModal";
import { formActions } from "~/store/form";
import DateModal from "~/components/modal/DateModal";

const Avatar = styled.Image`
  width: 108px;
  height: 108px;
  border-radius: 54px;
  margin-top: 43px;
  margin-bottom: 10px;
  align-self: center;
`;

const PaddingContainer = styled.View`
  padding: 0 42px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

export interface MissingReportFirstGoBack {
  goBack: () => void;
}

interface Props {
  navigation: MissingReportFirstPageScreenNavigationProp;
  name: string;
  avatar: string;
}

const MissingReportFirstPage = forwardRef<MissingReportFirstGoBack, Props>(
  ({ navigation, name, avatar }, ref) => {
    useImperativeHandle(ref, () => ({
      goBack: () => navigation.goBack(),
    }));

    const {
      hasTag,
      phoneNumber,
      lostHour,
      lostMinute,
      lostDate,
      lostMonth,
      lostPlace,
    } = useAppSelector(state => state.form);
    const dispatch = useDispatch();
    const { open, close, modalProps } = useModal();

    const onPhoneNumberChange = (text: string) => {
      dispatch(
        formActions.setState({ phoneNumber: text.replace(/[^0-9]/g, "") }),
      );
    };

    const onTagChange = (hasTag: boolean) => {
      dispatch(formActions.setState({ hasTag }));
    };

    const onPlaceChange = (text: string) => {
      dispatch(formActions.setState({ lostPlace: text }));
    };

    const onNext = () => navigation.navigate("MissingReportSecondPage");

    return (
      <>
        <KeyboardAwareScrollContainer isSpaceBetween>
          <PaddingContainer>
            <Avatar source={avatar ? { uri: avatar } : DEFAULT_AVATAR} />
            <MyText
              style={{ textAlign: "center", marginBottom: 30 }}
              color={palette.blue_86}
              fontSize={18}
              fontWeight="medium">
              {name}
            </MyText>
            <InputTitle>보호자 연락처</InputTitle>
            <Input
              maxLength={13}
              value={phoneNumber.replace(
                /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                "$1-$2-$3",
              )}
              onChangeText={onPhoneNumberChange}
              keyboardType="number-pad"
            />
            <InputTitle>인식표 유무</InputTitle>
            <RowContainer>
              <SelectableButton
                selected={hasTag}
                onPress={() => onTagChange(true)}
                style={{ marginRight: 20 }}>
                유
              </SelectableButton>
              <SelectableButton
                selected={!hasTag}
                onPress={() => onTagChange(false)}>
                무
              </SelectableButton>
            </RowContainer>
            <InputTitle>잃어버린 시간</InputTitle>
            <SelectableButton
              selected
              onPress={open}
              fontColor="rgba(0, 0, 0, 0.8)">
              {lostMonth}월 {lostDate}일 {lostHour < 12 ? "오전" : "오후"}{" "}
              {((lostHour + 11) % 12) + 1}시{" "}
              {lostMinute ? `${lostMinute}분` : ""}
            </SelectableButton>
            <InputTitle>잃어버린 장소</InputTitle>
            <Input
              maxLength={50}
              value={lostPlace}
              containerStyle={{ marginBottom: 50 }}
              onChangeText={onPlaceChange}
            />
          </PaddingContainer>
          <Button
            useCommonMarginBottom
            disabled={!phoneNumber || !lostMonth || !lostDate || !lostPlace}
            onPress={onNext}>
            다음
          </Button>
        </KeyboardAwareScrollContainer>
        <DateModal close={close} modalProps={modalProps} isEmergency />
      </>
    );
  },
);

export default MissingReportFirstPage;
