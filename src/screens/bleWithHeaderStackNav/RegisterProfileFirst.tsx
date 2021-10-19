import React, { useContext } from "react";
import { Keyboard, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import SelectableButton from "~/components/common/SelectableButton";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { RegisterProfileFirstScreenNavigationProp } from "~/types/navigator";
import AvatarCircle from "./AvatarCircle";

const InputContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding: 0px ${rpWidth(42)}px;
    margin-top: ${rpWidth(35)}px;
  `}
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
  const { name, birthYear, birthMonth, birthDay, gender } = useAppSelector(
    state => state.form,
  );
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View style={{ marginBottom: rpWidth(30) }}>
        <MyText
          style={{
            textAlign: "center",
            marginTop: rpWidth(46),
            marginBottom: rpWidth(35),
          }}
          fontSize={24}>
          프로필을 등록해주세요.
        </MyText>
        <AvatarContainer>
          <AvatarCircle />
        </AvatarContainer>
        <InputContainer rpWidth={rpWidth}>
          <InputTitle>이름</InputTitle>
          <Input
            value={name}
            onChangeText={text => dispatch(formActions.setName(text))}
          />
          <InputTitle>생년월일</InputTitle>
          <RowContainer>
            <Input
              value={birthYear}
              onChangeText={text =>
                dispatch(formActions.setBirthYear(text.replace(/[^0-9]/g, "")))
              }
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
              onChangeText={text =>
                dispatch(formActions.setBirthMonth(text.replace(/[^0-9]/g, "")))
              }
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
              onChangeText={text =>
                dispatch(formActions.setBirthDay(text.replace(/[^0-9]/g, "")))
              }
              keyboardType="number-pad"
              textAlign="center"
              containerStyle={{
                width: "25.86%",
              }}
              solidPlaceholderTitle="일"
              maxLength={2}
            />
          </RowContainer>
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
        </InputContainer>
      </View>
      <Button
        disabled={!name || !birthYear || !gender}
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
