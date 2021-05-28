import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Input from "~/components/common/input/Input";

const InputContainer = styled.View`
  margin: 26px 0px;
`;

const TextContainer = styled.View`
  margin: 36px 0px;
`;

const Text = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const DeleteAccount = () => {
  const handlePress = () => {};

  return (
    <KeyboardAwareScrollView>
      <SidePaddingContainer>
        <TextContainer>
          <Text>
            혹시 서비스를 이용하시면서 불편하셨던 점을 {"\n"}알려주시면 적극
            반영하여 향후 서비스 품질 {"\n"}개선을 위해 노력하겠습니다.
          </Text>
          <InputContainer>
            <Input />
          </InputContainer>
          <Text>
            회원 탈퇴 시 2개월간 동일한 휴대폰 번호나 {"\n"}이메일 주소로
            재가입이 불가능합니다.
          </Text>
        </TextContainer>
        <ConfirmButton style={{ alignItems: "center" }} onPress={handlePress}>
          동의 및 탈퇴
        </ConfirmButton>
      </SidePaddingContainer>
    </KeyboardAwareScrollView>
  );
};

export default DeleteAccount;
