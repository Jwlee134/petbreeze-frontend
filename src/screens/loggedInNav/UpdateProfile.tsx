import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import deviceApi from "~/api/device";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import SelectableButton from "~/components/common/SelectableButton";
import { noAvatar, serverImageUri } from "~/constants";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import useModal from "~/hooks/useModal";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { UpdateProfileScreenProps } from "~/types/navigator";
import imageHandler from "~/utils/imageHandler";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import DatePicker from "react-native-date-picker";

const AvatarButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(108)}px;
    height: ${rpWidth(108)}px;
    border-radius: ${rpWidth(54)}px;
    margin-top: ${rpWidth(34)}px;
    margin-bottom: ${rpWidth(28)}px;
  `}
  overflow: hidden;
  align-self: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(36)}px`};
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const UpdateProfile = ({
  navigation,
  route: {
    params: { deviceID },
  },
}: UpdateProfileScreenProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const {
    name,
    birthYear,
    birthMonth,
    birthDay,
    species,
    photos,
    sex,
    weight,
  } = useAppSelector(state => state.deviceSetting.profile);
  const dispatch = useDispatch();
  const [triggerProfile] = deviceApi.useUpdateDeviceProfileMutation();
  const [triggerAvatar] = deviceApi.useUpdateDeviceProfileAvatarMutation();
  const [loading, setLoading] = useState(false);
  const { open, close, modalProps } = useModal();
  const [date, setDate] = useState(
    birthYear ? new Date(birthYear, birthMonth, birthDay) : new Date(),
  );

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    if (photos[0] && !photos[0].includes(serverImageUri)) {
      try {
        await triggerAvatar({
          deviceID,
          body: imageHandler.handleFormData(photos[0], "profile_image"),
        }).unwrap();
      } catch {
        return;
      }
    }
    try {
      await triggerProfile({
        deviceID,
        body: {
          name,
          sex,
          weight: parseInt(weight, 10),
          species,
          birthdate: `${birthYear}-${birthMonth}-${birthDay}`,
        },
      }).unwrap();
    } catch {
      return;
    }

    navigation.goBack();
  };

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.setProfile(null));
    };
  }, []);

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View style={{ marginBottom: rpWidth(30) }}>
          <AvatarButton
            onPress={imageHandler.openCircleCropper}
            rpWidth={rpWidth}>
            <Image source={photos[0] ? { uri: photos[0] } : noAvatar} />
          </AvatarButton>
          <InputContainer rpWidth={rpWidth}>
            <InputTitle>이름</InputTitle>
            <Input
              maxLength={16}
              value={name}
              onChangeText={text =>
                dispatch(deviceSettingActions.setProfile({ name: text }))
              }
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
            <InputTitle>성별</InputTitle>
            <RowContainer>
              <SelectableButton
                style={{ flexGrow: 1, marginRight: rpWidth(20) }}
                onPress={() =>
                  dispatch(deviceSettingActions.setProfile({ sex: true }))
                }
                selected={sex}>
                남
              </SelectableButton>
              <SelectableButton
                style={{ flexGrow: 1 }}
                onPress={() =>
                  dispatch(deviceSettingActions.setProfile({ sex: false }))
                }
                selected={!sex}>
                여
              </SelectableButton>
            </RowContainer>
            <InputTitle>품종</InputTitle>
            <Input
              maxLength={16}
              value={species}
              onChangeText={text =>
                dispatch(deviceSettingActions.setProfile({ species: text }))
              }
            />
            <InputTitle>체중</InputTitle>
            <Input
              value={weight}
              onChangeText={text =>
                dispatch(
                  deviceSettingActions.setProfile({
                    weight: text.replace(/[^0-9]/g, ""),
                  }),
                )
              }
              keyboardType="number-pad"
              solidPlaceholderTitle="kg"
              alignLeftSolidPlaceholderWhenFocus
            />
          </InputContainer>
        </View>
        <Button
          disabled={
            !name ||
            !birthYear ||
            !birthMonth ||
            !birthDay ||
            !species ||
            !weight
          }
          isLoading={loading}
          useCommonMarginBottom
          onPress={handleSubmit}>
          확인
        </Button>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          rightButtonText="확인"
          onRightButtonPress={() => {
            dispatch(
              deviceSettingActions.setProfile({
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

export default UpdateProfile;
