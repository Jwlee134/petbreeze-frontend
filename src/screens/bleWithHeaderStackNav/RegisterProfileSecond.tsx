import React, { forwardRef, useContext, useImperativeHandle } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import AvatarCircle from "~/components/ble/AvatarCircle";
import PreviousValueBlock from "~/components/ble/PreviousValueBlock";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Sex from "~/components/profileForm/Sex";
import Species from "~/components/profileForm/Species";
import Weight from "~/components/profileForm/Weight";
import { DimensionsContext } from "~/context/DimensionsContext";
import useUpdateDeviceProfile from "~/hooks/useUpdateDeviceProfile";
import { useAppSelector } from "~/store";
import { minSpace } from "~/styles/constants";
import { RegisterProfileSecondScreenNavigationProp } from "~/types/navigator";

const InputContainer = styled.View`
  padding: 0px 42px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const AvatarContainer = styled(RowContainer)`
  padding-right: 30px;
  padding-left: 37px;
`;

export interface RegisterProfileSecondGoBack {
  goBack: () => void;
}

const RegisterProfileSecond = forwardRef<
  RegisterProfileSecondGoBack,
  {
    navigation: RegisterProfileSecondScreenNavigationProp;
  }
>(({ navigation }, ref) => {
  const { rpHeight } = useContext(DimensionsContext);
  const { species, weight } = useAppSelector(state => state.form);
  const deviceID = useAppSelector(state => state.ble.deviceID);
  const { updateProfileReq, isLoading } = useUpdateDeviceProfile(deviceID);

  useImperativeHandle(ref, () => ({
    goBack: () => navigation.goBack(),
  }));

  const handleSubmit = async () => {
    try {
      await updateProfileReq();
      navigation.reset({
        index: 0,
        routes: [
          { name: "LoggedInNav", params: { initialRouteName: "Welcome" } },
        ],
      });
    } catch {}
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View>
        <AvatarContainer style={{ marginTop: rpHeight(104) }}>
          <AvatarCircle />
          <PreviousValueBlock />
        </AvatarContainer>
        <InputContainer style={{ marginTop: rpHeight(51) }}>
          <Sex />
          <Species />
          <Weight />
        </InputContainer>
      </View>
      <Button
        style={{ marginTop: rpHeight(minSpace) }}
        isLoading={isLoading}
        disabled={!species || !weight}
        useCommonMarginBottom
        onPress={handleSubmit}>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
});

export default RegisterProfileSecond;
