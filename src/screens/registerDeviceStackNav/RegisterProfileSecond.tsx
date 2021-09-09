import React from "react";
import { Keyboard, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import SelectableButton from "~/components/common/SelectableButton";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { rpWidth } from "~/styles";
import { RegisterProfileSecondScreenNavigationProp } from "~/types/navigator";
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
  const gender = useAppSelector(state => state.form.gender);
  const breed = useAppSelector(state => state.form.breed);
  const weight = useAppSelector(state => state.form.weight);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollContainer
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}>
        <View>
          <AvatarContainer>
            <AvatarCircle />
            <PreviousValueBlock isSecond />
          </AvatarContainer>
          <InputContainer>
            <InputTitle>성별</InputTitle>
            <RowContainer>
              <SelectableButton
                selected={gender === "남"}
                style={{
                  marginRight: rpWidth(20),
                }}
                onPress={() => dispatch(formActions.setGender("남"))}>
                남
              </SelectableButton>
              <SelectableButton
                selected={gender === "여"}
                onPress={() => dispatch(formActions.setGender("여"))}>
                여
              </SelectableButton>
            </RowContainer>
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
          </InputContainer>
        </View>
        <Button
          disabled={!gender || !breed || !weight}
          useCommonMarginBottom
          onPress={() => {
            Keyboard.dismiss();
            navigation.navigate("RegisterProfileThird");
          }}>
          다음
        </Button>
      </KeyboardAwareScrollContainer>
    </SafeAreaView>
  );
};

export default RegisterProfileSecond;
