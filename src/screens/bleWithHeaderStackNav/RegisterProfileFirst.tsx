import React from "react";
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

const InputContainer = styled.View`
  padding: 0px 42px;
  margin-top: 74px;
`;

const AvatarContainer = styled.View`
  margin: 0 auto;
`;

const RegisterProfileFirst = ({
  navigation,
}: {
  navigation: RegisterProfileFirstScreenNavigationProp;
}) => {
  const { name, birthYear } = useAppSelector(state => state.form);

  const onNext = () => {
    Keyboard.dismiss();
    navigation.navigate("RegisterProfileSecond");
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View style={{ marginBottom: minSpace }}>
        <MyText
          style={{
            textAlign: "center",
            marginTop: 46,
            marginBottom: 65,
          }}
          fontSize={24}>
          프로필을 등록해주세요.
        </MyText>
        <AvatarContainer>
          <AvatarCircle />
        </AvatarContainer>
        <InputContainer>
          <Name />
          <BirthDate />
        </InputContainer>
      </View>
      <Button
        disabled={!name || !birthYear}
        useCommonMarginBottom
        onPress={onNext}>
        다음
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default RegisterProfileFirst;
