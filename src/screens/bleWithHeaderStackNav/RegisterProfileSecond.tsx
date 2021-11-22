import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import deviceApi from "~/api/device";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import SelectableButton from "~/components/common/SelectableButton";
import { serverImageUri } from "~/constants";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { RegisterProfileSecondScreenNavigationProp } from "~/types/navigator";
import imageHandler from "~/utils/imageHandler";
import AvatarCircle from "./AvatarCircle";
import PreviousValueBlock from "./PreviousValueBlock";

const InputContainer = styled.View`
  padding: 0px 42px;
  margin-top: 56px;
  margin-bottom: 50px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const AvatarContainer = styled(RowContainer)`
  ${({}) => css`
    padding-right: 30px;
    padding-left: 37px;
    margin-top: 51px;
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
  } = useAppSelector(state => state.form);
  const deviceID = useAppSelector(state => state.ble.deviceID);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [trigger] = deviceApi.useUpdateDeviceProfileMutation();
  const [triggerAvatar] = deviceApi.useUpdateDeviceProfileAvatarMutation();

  const handleSubmit = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      if (photos[0] && !photos[0].includes(serverImageUri)) {
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
      navigation.replace("BleWithoutHeaderStackNav", {
        initialRouteName: "Completion",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View>
        <AvatarContainer>
          <AvatarCircle />
          <PreviousValueBlock />
        </AvatarContainer>
        <InputContainer>
          <InputTitle>성별</InputTitle>
          <RowContainer>
            <SelectableButton
              selected={sex}
              style={{
                marginRight: 20,
                marginBottom: 35,
              }}
              onPress={() => dispatch(formActions.setState({ sex: true }))}>
              남
            </SelectableButton>
            <SelectableButton
              selected={!sex}
              onPress={() => dispatch(formActions.setState({ sex: false }))}>
              여
            </SelectableButton>
          </RowContainer>
          <InputTitle>품종</InputTitle>
          <Input
            maxLength={16}
            containerStyle={{ marginBottom: 35 }}
            value={species}
            onChangeText={text =>
              dispatch(formActions.setState({ species: text }))
            }
          />
          <InputTitle>체중</InputTitle>
          <Input
            value={weight}
            onChangeText={text =>
              dispatch(
                formActions.setState({
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
