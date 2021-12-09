import React, { forwardRef, useContext, useImperativeHandle } from "react";
import { Keyboard, View } from "react-native";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import MyText from "~/components/common/MyText";
import { minSpace } from "~/styles/constants";
import AvatarCircle from "~/components/ble/AvatarCircle";
import { useAppSelector } from "~/store";
import { RegisterProfileFirstScreenNavigationProp } from "~/types/navigator";
import Name from "~/components/profileForm/Name";
import BirthDate from "~/components/profileForm/BirthDate";
import { DimensionsContext } from "~/context/DimensionsContext";

const InputContainer = styled.View`
  padding: 0px 42px;
`;

const AvatarContainer = styled.View`
  margin: 0 auto;
`;

export interface RegisterProfileFirstGoBack {
  goBack: () => void;
}

const RegisterProfileFirst = forwardRef<
  RegisterProfileFirstGoBack,
  { navigation: RegisterProfileFirstScreenNavigationProp }
>(({ navigation }, ref) => {
  const { rpHeight } = useContext(DimensionsContext);
  const { name, birthYear } = useAppSelector(state => state.form);

  useImperativeHandle(ref, () => ({
    goBack: () => navigation.goBack(),
  }));

  const onNext = () => {
    Keyboard.dismiss();
    navigation.navigate("RegisterProfileSecond");
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View>
        <MyText
          style={{ textAlign: "center", marginTop: rpHeight(109) }}
          fontSize={24}>
          프로필을 등록해주세요.
        </MyText>
        <AvatarContainer
          style={{ marginTop: rpHeight(56), marginBottom: rpHeight(36) }}>
          <AvatarCircle />
        </AvatarContainer>
        <InputContainer>
          <Name />
          <BirthDate />
        </InputContainer>
      </View>
      <Button
        style={{ marginTop: rpHeight(minSpace) }}
        disabled={!name || !birthYear}
        useCommonMarginBottom
        onPress={onNext}>
        다음
      </Button>
    </KeyboardAwareScrollContainer>
  );
});

export default RegisterProfileFirst;
