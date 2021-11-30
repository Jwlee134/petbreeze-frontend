import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import AvatarCircle from "~/components/ble/AvatarCircle";
import PreviousValueBlock from "~/components/ble/PreviousValueBlock";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Sex from "~/components/profileForm/Sex";
import Species from "~/components/profileForm/Species";
import Weight from "~/components/profileForm/Weight";
import useUpdateProfileReq from "~/hooks/useUpdateProfileReq";
import { useAppSelector } from "~/store";
import { RegisterProfileSecondScreenNavigationProp } from "~/types/navigator";

const InputContainer = styled.View`
  padding: 0px 42px;
  margin-top: 56px;
  margin-bottom: 50px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const AvatarContainer = styled(RowContainer)`
  padding-right: 30px;
  padding-left: 37px;
  margin-top: 51px;
`;

const RegisterProfileSecond = ({
  navigation,
}: {
  navigation: RegisterProfileSecondScreenNavigationProp;
}) => {
  const { species, weight } = useAppSelector(state => state.form);
  const deviceID = useAppSelector(state => state.ble.deviceID);
  const { updateProfileReq, isLoading } = useUpdateProfileReq(deviceID);

  const handleSubmit = () => {
    updateProfileReq().then(() => {
      navigation.replace("BleWithoutHeaderStackNav", {
        initialRouteName: "Completion",
      });
    });
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View>
        <AvatarContainer>
          <AvatarCircle />
          <PreviousValueBlock />
        </AvatarContainer>
        <InputContainer>
          <Sex />
          <Species />
          <Weight />
        </InputContainer>
      </View>
      <Button
        isLoading={isLoading}
        disabled={!species || !weight}
        useCommonMarginBottom
        onPress={handleSubmit}>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default RegisterProfileSecond;
