import React, { useContext } from "react";
import { useState } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import SelectableButton from "~/components/common/SelectableButton";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import {
  UpdateProfileRouteProp,
  UpdateProfileScreenNavigationProp,
} from "~/types/navigator";

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
}: {
  navigation: UpdateProfileScreenNavigationProp;
}) => {
  const { rpWidth } = useContext(DimensionsContext);
  const [name, setName] = useState(device.name);
  const [birthYear, setBirthYear] = useState("1997");
  const [birtyMonth, setBirthMonth] = useState("11");
  const [birthDay, setBirthDay] = useState("19");
  const [gender, setGender] = useState(device.gender);
  const [breed, setBreed] = useState(device.breed);
  const [weight, setWeight] = useState(String(device.weight));
  const [etc, setEtc] = useState(device.etc);

  const openGallery = () => {};

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View style={{ marginBottom: rpWidth(30) }}>
        <AvatarButton rpWidth={rpWidth}>
          <Image source={require("~/assets/image/test.jpg")} />
        </AvatarButton>
        <InputContainer rpWidth={rpWidth}>
          <InputTitle>이름</InputTitle>
          <Input value={name} onChangeText={text => setName(text)} />
          <InputTitle>생년월일</InputTitle>
          <RowContainer>
            <Input
              value={birthYear}
              onChangeText={text => setBirthYear(text)}
              keyboardType="number-pad"
              containerStyle={{
                width: "34.48%",
                marginRight: "6.9%",
              }}
              solidPlaceholderTitle="년"
              textAlign="center"
            />
            <Input
              value={birtyMonth}
              onChangeText={text => setBirthMonth(text)}
              keyboardType="number-pad"
              containerStyle={{
                width: "25.86%",
                marginRight: "6.9%",
              }}
              solidPlaceholderTitle="월"
              textAlign="center"
            />
            <Input
              value={birthDay}
              onChangeText={text => setBirthDay(text)}
              keyboardType="number-pad"
              containerStyle={{
                width: "25.86%",
                marginRight: "6.9%",
              }}
              solidPlaceholderTitle="일"
              textAlign="center"
            />
          </RowContainer>
          <InputTitle>성별</InputTitle>
          <RowContainer>
            <SelectableButton
              style={{ flexGrow: 1, marginRight: rpWidth(20) }}
              onPress={() => setGender("남")}
              selected={gender === "남"}>
              남
            </SelectableButton>
            <SelectableButton
              style={{ flexGrow: 1 }}
              onPress={() => setGender("여")}
              selected={gender === "여"}>
              여
            </SelectableButton>
          </RowContainer>
          <InputTitle>품종</InputTitle>
          <Input value={breed} onChangeText={text => setBreed(text)} />
          <InputTitle>체중</InputTitle>
          <Input
            value={weight}
            onChangeText={text => setWeight(text)}
            keyboardType="number-pad"
            solidPlaceholderTitle="kg"
            alignLeftSolidPlaceholderWhenFocus
          />
          <InputTitle>기타사항</InputTitle>
          <Input value={etc} onChangeText={text => setEtc(text)} />
        </InputContainer>
      </View>
      <Button useCommonMarginBottom>확인</Button>
    </KeyboardAwareScrollContainer>
  );
};

export default UpdateProfile;
