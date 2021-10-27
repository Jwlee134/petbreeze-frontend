import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import SelectableButton from "~/components/common/SelectableButton";
import { noAvatar } from "~/constants";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import palette from "~/styles/palette";
import { EmergencyMissingFirstPageScreenNavigationProp } from "~/types/navigator";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import DatePicker from "react-native-date-picker";

const Avatar = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(108)}px;
    height: ${rpWidth(108)}px;
    border-radius: ${rpWidth(54)}px;
    margin-top: ${rpWidth(43)}px;
    margin-bottom: ${rpWidth(10)}px;
  `}
  align-self: center;
`;

const PaddingContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(42)}px`};
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const EmergencyMissingFirstPage = ({
  navigation,
  name,
  avatar,
}: {
  navigation: EmergencyMissingFirstPageScreenNavigationProp;
  name: string;
  avatar: string;
}) => {
  const {
    hasTag,
    phoneNumber,
    lostHour,
    lostMinute,
    lostDate,
    lostMonth,
    lostPlace,
  } = useAppSelector(state => state.deviceSetting.profile);
  const { rpWidth } = useContext(DimensionsContext);
  const dispatch = useDispatch();
  const { open, close, modalProps } = useModal();
  const [date, setDate] = useState(
    new Date(lostMonth, lostDate, lostMinute, lostHour),
  );

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <PaddingContainer rpWidth={rpWidth}>
          <Avatar
            rpWidth={rpWidth}
            source={avatar ? { uri: avatar } : noAvatar}
          />
          <MyText
            style={{ textAlign: "center", marginBottom: rpWidth(30) }}
            color={palette.blue_7b_90}
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
            onChangeText={text =>
              dispatch(
                deviceSettingActions.setProfile({
                  phoneNumber: text.replace(/[^0-9]/g, ""),
                }),
              )
            }
            keyboardType="number-pad"
          />
          <InputTitle>인식표 유무</InputTitle>
          <RowContainer>
            <SelectableButton
              selected={hasTag}
              onPress={() =>
                dispatch(deviceSettingActions.setProfile({ hasTag: true }))
              }
              style={{ marginRight: rpWidth(20) }}>
              유
            </SelectableButton>
            <SelectableButton
              selected={!hasTag}
              onPress={() =>
                dispatch(deviceSettingActions.setProfile({ hasTag: false }))
              }>
              무
            </SelectableButton>
          </RowContainer>
          <InputTitle>잃어버린 시간</InputTitle>
          <SelectableButton
            selected
            onPress={open}
            fontColor="rgba(0, 0, 0, 0.8)">
            {lostMonth}월 {lostDate}일 {lostHour < 12 ? "오전" : "오후"}{" "}
            {((lostHour + 11) % 12) + 1}시 {lostMinute ? `${lostMinute}분` : ""}
          </SelectableButton>
          <InputTitle>잃어버린 장소</InputTitle>
          <Input
            maxLength={50}
            value={lostPlace}
            containerStyle={{ marginBottom: rpWidth(50) }}
            onChangeText={text =>
              dispatch(
                deviceSettingActions.setProfile({
                  lostPlace: text,
                }),
              )
            }
          />
        </PaddingContainer>
        <Button
          useCommonMarginBottom
          disabled={!phoneNumber || !lostMonth || !lostDate || !lostPlace}
          onPress={() => {
            navigation.navigate("EmergencyMissingSecondPage");
          }}>
          다음
        </Button>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          rightButtonText="확인"
          onRightButtonPress={() => {
            dispatch(
              deviceSettingActions.setProfile({
                lostMonth: date.getMonth() + 1,
                lostDate: date.getDate(),
                lostHour: date.getHours(),
                lostMinute: date.getMinutes(),
              }),
            );
            close();
          }}
          close={close}
          style={{ width: "auto" }}>
          <DatePicker
            maximumDate={new Date()}
            date={date}
            onDateChange={setDate}
          />
        </CommonCenterModal>
      </Modal>
    </>
  );
};

export default EmergencyMissingFirstPage;
