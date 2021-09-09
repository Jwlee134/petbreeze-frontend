import React from "react";
import { Keyboard, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { rpWidth } from "~/styles";
import { RegisterProfileFirstScreenNavigationProp } from "~/types/navigator";
import AvatarCircle from "./AvatarCircle";

const InputContainer = styled.View`
  padding: 0px ${rpWidth(42)}px;
  margin-top: ${rpWidth(48)}px;
  margin-bottom: ${rpWidth(50)}px;
`;

const AvatarContainer = styled.View`
  margin: 0 auto;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const RegisterProfileFirst = ({
  navigation,
}: {
  navigation: RegisterProfileFirstScreenNavigationProp;
}) => {
  const name = useAppSelector(state => state.form.name);
  const birthYear = useAppSelector(state => state.form.birthYear);
  const birthMonth = useAppSelector(state => state.form.birthMonth);
  const birthDay = useAppSelector(state => state.form.birthDay);
  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollContainer
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}>
      <View>
        <MyText
          style={{
            textAlign: "center",
            marginTop: rpWidth(46),
            marginBottom: rpWidth(35),
          }}
          fontSize={24}>
          반려동물 프로필을{"\n"}등록해주세요.
        </MyText>
        <AvatarContainer>
          <AvatarCircle />
        </AvatarContainer>
        <InputContainer>
          <InputTitle>이름</InputTitle>
          <Input
            value={name}
            onChangeText={text => dispatch(formActions.setName(text))}
          />
          <InputTitle>생년월일</InputTitle>
          <RowContainer>
            <Input
              value={birthYear}
              onChangeText={text => dispatch(formActions.setBirthYear(text))}
              keyboardType="number-pad"
              textAlign="center"
              containerStyle={{
                width: "34.48%",
                marginRight: "6.9%",
              }}
              solidPlaceholderTitle="년"
              maxLength={4}
            />
            <Input
              value={birthMonth}
              onChangeText={text => dispatch(formActions.setBirthMonth(text))}
              keyboardType="number-pad"
              textAlign="center"
              containerStyle={{
                width: "25.86%",
                marginRight: "6.9%",
              }}
              solidPlaceholderTitle="월"
              maxLength={2}
            />
            <Input
              value={birthDay}
              onChangeText={text => dispatch(formActions.setBirthDay(text))}
              keyboardType="number-pad"
              textAlign="center"
              containerStyle={{
                width: "25.86%",
              }}
              solidPlaceholderTitle="일"
              maxLength={2}
            />
          </RowContainer>
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
  );
};

export default RegisterProfileFirst;
