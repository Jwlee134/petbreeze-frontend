import React, { useEffect } from "react";
import styled from "styled-components/native";
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
import useUpdateDeviceProfile from "~/hooks/useUpdateDeviceProfile";
import { useDispatch } from "react-redux";
import { formActions } from "~/store/form";
import CustomHeader from "~/components/navigator/CustomHeader";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";
import MyText from "~/components/common/MyText";
import palette from "~/styles/palette";
import { textLoadingIndicatorSize } from "~/styles/constants";
import Camera from "~/assets/svg/camera/camera-white.svg";

const AvatarButton = styled.TouchableOpacity`
  width: 108px;
  height: 108px;
  border-radius: 54px;
  margin-top: 26px;
  margin-bottom: 30px;
  overflow: hidden;
  align-self: center;
`;

const Overlay = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
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
  const { updateProfileReq, isLoading } = useUpdateDeviceProfile(deviceID);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      !name ||
      !birthYear ||
      !birthMonth ||
      !birthDay ||
      !species ||
      !weight
    ) {
      return;
    }
    updateProfileReq();
  };

  useEffect(() => {
    return () => {
      dispatch(formActions.setState(null));
    };
  }, []);

  return (
    <>
      <CustomHeader
        onRightButtonPress={handleSubmit}
        navigation={navigation}
        title="프로필 수정"
        RightButtonText={
          isLoading ? (
            <LoadingIndicator size={textLoadingIndicatorSize} />
          ) : (
            <MyText color={palette.blue_7b}>완료</MyText>
          )
        }
      />
      <KeyboardAwareScrollContainer
        contentContainerStyle={{ paddingBottom: 30 }}>
        <AvatarButton onPress={imageHandler.openCircleCropper}>
          <Overlay>
            <Camera />
          </Overlay>
          <Image source={photos[0] ? { uri: photos[0] } : noAvatar} />
        </AvatarButton>
        <InputContainer>
          <Name />
          <BirthDate />
          <Sex />
          <Species />
          <Weight />
        </InputContainer>
      </KeyboardAwareScrollContainer>
    </>
  );
};

export default UpdateProfile;
