import React from "react";
import { Keyboard, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { navigatorActions } from "~/store/navigator";
import { rpWidth } from "~/styles";
import { RegisterProfileSecondScreenNavigationProp } from "~/types/navigator";
import { isIos } from "~/utils";
import AvatarCircle from "./AvatarCircle";
import PreviousValueBlock from "./PreviousValueBlock";

const InputContainer = styled.View`
  padding: 0px 42px;
  margin-top: ${rpWidth(56)}px;
  margin-bottom: ${rpWidth(50)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const AvatarContainer = styled(RowContainer)`
  padding-right: ${rpWidth(30)}px;
  padding-left: ${rpWidth(37)}px;
  margin-top: ${rpWidth(51)}px;
`;

const RegisterProfileSecond = ({
  navigation,
}: {
  navigation: RegisterProfileSecondScreenNavigationProp;
}) => {
  const {
    avatar,
    name,
    birthYear,
    birthMonth,
    birthDay,
    gender,
    breed,
    weight,
    characteristic,
  } = useAppSelector(state => state.form);
  const dispatch = useDispatch();

  const handleFormData = () => {
    if (!avatar) return;
    const image = new FormData();
    console.log(avatar);
    image.append(`image1`, {
      name: avatar.path.substring(avatar.path.lastIndexOf("/") + 1),
      type: avatar.mime,
      uri: isIos ? `file://${avatar.path}` : avatar.path,
      data: avatar?.data || null,
    });
    return image;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    dispatch(
      navigatorActions.setInitialRoute({
        initialBleWithoutHeaderStackNavRouteName: "Completion",
      }),
    );
    navigation.replace("BleWithoutHeaderStackNav");
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View>
        <AvatarContainer>
          <AvatarCircle />
          <PreviousValueBlock />
        </AvatarContainer>
        <InputContainer>
          <InputTitle>품종</InputTitle>
          <Input
            value={breed}
            onChangeText={text => dispatch(formActions.setBreed(text))}
          />
          <InputTitle>체중</InputTitle>
          <Input
            value={weight}
            onChangeText={text => dispatch(formActions.setWeight(text))}
            keyboardType="number-pad"
            solidPlaceholderTitle="kg"
            alignLeftSolidPlaceholderWhenFocus
            maxLength={2}
          />
          <InputTitle>특징</InputTitle>
          <Input
            value={characteristic}
            onChangeText={text => dispatch(formActions.setCharacteristic(text))}
          />
        </InputContainer>
      </View>
      <Button
        disabled={!avatar || !breed || !weight}
        useCommonMarginBottom
        onPress={handleSubmit}>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default RegisterProfileSecond;
