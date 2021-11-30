import React, { useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import { noAvatar } from "~/constants";
import { useAppSelector } from "~/store";
import Name from "~/components/profileForm/Name";
import BirthDate from "~/components/profileForm/BirthDate";
import Species from "~/components/profileForm/Species";
import Weight from "~/components/profileForm/Weight";
import Sex from "~/components/profileForm/Sex";
import imageHandler from "~/utils/imageHandler";
import { UpdateProfileScreenProps } from "~/types/navigator";
import useUpdateProfileReq from "~/hooks/useUpdateProfileReq";
import { useDispatch } from "react-redux";
import { formActions } from "~/store/form";

const AvatarButton = styled.TouchableOpacity`
  width: 108px;
  height: 108px;
  border-radius: 54px;
  margin-top: 34px;
  margin-bottom: 28px;
  overflow: hidden;
  align-self: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.View`
  padding: 0 36px;
`;

const UpdateProfile = ({
  navigation,
  route: {
    params: { deviceID },
  },
}: UpdateProfileScreenProps) => {
  const { name, birthYear, birthMonth, birthDay, species, photos, weight } =
    useAppSelector(state => state.form);
  const { updateProfileReq, isLoading } = useUpdateProfileReq(deviceID);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    updateProfileReq().then(() => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    return () => {
      dispatch(formActions.setState(null));
    };
  }, []);

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View style={{ marginBottom: 30 }}>
        <AvatarButton onPress={imageHandler.openCircleCropper}>
          <Image source={photos[0] ? { uri: photos[0] } : noAvatar} />
        </AvatarButton>
        <InputContainer>
          <Name />
          <BirthDate />
          <Sex />
          <Species />
          <Weight />
        </InputContainer>
      </View>
      <Button
        disabled={
          !name || !birthYear || !birthMonth || !birthDay || !species || !weight
        }
        isLoading={isLoading}
        useCommonMarginBottom
        onPress={handleSubmit}>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default UpdateProfile;
