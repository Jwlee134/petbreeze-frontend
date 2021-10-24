import React, { useContext, useState } from "react";
import { Keyboard, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import deviceApi from "~/api/device";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import SelectableButton from "~/components/common/SelectableButton";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { navigatorActions } from "~/store/navigator";
import { RegisterProfileSecondScreenNavigationProp } from "~/types/navigator";
import imageHandler from "~/utils/imageHandler";
import AvatarCircle from "./AvatarCircle";
import PreviousValueBlock from "./PreviousValueBlock";

const InputContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: 0px 42px;
  ${({ rpWidth }) => css`
    margin-top: ${rpWidth(56)}px;
    margin-bottom: ${rpWidth(50)}px;
  `}
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const AvatarContainer = styled(RowContainer)<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding-right: ${rpWidth(30)}px;
    padding-left: ${rpWidth(37)}px;
    margin-top: ${rpWidth(51)}px;
  `}
`;

const RegisterProfileSecond = ({
  navigation,
}: {
  navigation: RegisterProfileSecondScreenNavigationProp;
}) => {
  const {
    photos,
    name,
    birthYear,
    birthMonth,
    birthDay,
    sex,
    species,
    weight,
  } = useAppSelector(state => state.deviceSetting.profile);
  const deviceID = useAppSelector(state => state.ble.deviceID);
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);
  const [loading, setLoading] = useState(false);
  const [trigger] = deviceApi.useUpdateDeviceProfileMutation();
  const [triggerAvatar] = deviceApi.useUpdateDeviceProfileAvatarMutation();

  const handleSubmit = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      if (photos[0]) {
        await triggerAvatar({
          deviceID,
          body: imageHandler.handleFormData(photos[0], "profile_image"),
        }).unwrap();
      }
      await trigger({
        deviceID,
        body: {
          name,
          sex,
          weight: parseInt(weight, 10),
          species,
          birthdate: `${birthYear}-${birthMonth}-${birthDay}`,
        },
      }).unwrap();
      dispatch(
        navigatorActions.setInitialRoute({
          initialBleWithoutHeaderStackNavRouteName: "Completion",
        }),
      );
      navigation.replace("BleWithoutHeaderStackNav");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View>
        <AvatarContainer rpWidth={rpWidth}>
          <AvatarCircle />
          <PreviousValueBlock />
        </AvatarContainer>
        <InputContainer rpWidth={rpWidth}>
          <InputTitle>성별</InputTitle>
          <RowContainer>
            <SelectableButton
              selected={sex}
              style={{
                marginRight: rpWidth(20),
                marginBottom: rpWidth(35),
              }}
              onPress={() =>
                dispatch(deviceSettingActions.setProfile({ sex: true }))
              }>
              남
            </SelectableButton>
            <SelectableButton
              selected={!sex}
              onPress={() =>
                dispatch(deviceSettingActions.setProfile({ sex: false }))
              }>
              여
            </SelectableButton>
          </RowContainer>
          <InputTitle>품종</InputTitle>
          <Input
            containerStyle={{ marginBottom: rpWidth(35) }}
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
            maxLength={2}
          />
        </InputContainer>
      </View>
      <Button
        isLoading={loading}
        disabled={!species || !weight}
        useCommonMarginBottom
        onPress={handleSubmit}>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default RegisterProfileSecond;
