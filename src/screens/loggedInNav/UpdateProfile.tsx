import React from "react";
import { useState } from "react";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import { rpWidth } from "~/styles";
import {
  UpdateProfileRouteProp,
  UpdateProfileScreenNavigationProp,
} from "~/types/navigator";

const AvatarButton = styled.TouchableOpacity`
  width: ${rpWidth(108)}px;
  height: ${rpWidth(108)}px;
  border-radius: ${rpWidth(54)}px;
  overflow: hidden;
  align-self: center;
  margin-top: ${rpWidth(34)}px;
  margin-bottom: ${rpWidth(28)}px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.View`
  padding: 0px ${rpWidth(36)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const UpdateProfile = ({
  navigation,
  route,
}: {
  navigation: UpdateProfileScreenNavigationProp;
  route: UpdateProfileRouteProp;
}) => {
  const device = route.params.data;
  const [name, setName] = useState(device.name);
  const [birthYear, setBirthYear] = useState("1997");
  const [birtyMonth, setBirthMonth] = useState("11");
  const [birthDay, setBirthDay] = useState("19");
  const [gender, setGender] = useState(device.gender);
  const [breed, setBreed] = useState(device.breed);
  const [weight, setWeight] = useState(String(device.weight));
  const [phoneNumber, setPhoneNumber] = useState(device.phoneNumber);
  const [etc, setEtc] = useState(device.etc);

  const openGallery = () => {};

  return (
    <KeyboardAwareScrollContainer>
      <AvatarButton>
        <Image source={require("~/assets/image/test.jpg")} />
      </AvatarButton>
      <InputContainer>
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
          />
        </RowContainer>
        <InputTitle>성별</InputTitle>
        <RowContainer style={{ marginBottom: rpWidth(14) }}>
          <Button
            style={{ flexGrow: 1, marginRight: rpWidth(20) }}
            onPress={() => setGender("남")}
            selected={gender === "남"}
            isRow
            useInputStyle>
            남
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            onPress={() => setGender("여")}
            selected={gender === "여"}
            isRow
            useInputStyle>
            여
          </Button>
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
        <InputTitle>보호자 연락처</InputTitle>
        <Input
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="number-pad"
        />
        <InputTitle>기타사항</InputTitle>
        <Input
          value={etc}
          onChangeText={text => setEtc(text)}
          style={{
            marginBottom: rpWidth(110),
          }}
        />
      </InputContainer>
      <SidePaddingContainer>
        <Button useCommonMarginBottom useBottomInset>
          확인
        </Button>
      </SidePaddingContainer>
    </KeyboardAwareScrollContainer>
  );
};

export default UpdateProfile;
