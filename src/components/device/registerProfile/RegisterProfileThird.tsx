import React from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import deviceApi from "~/api/device";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import { store, useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { rpWidth } from "~/styles";
import { isIos } from "~/utils";
import AvatarCircle from "./AvatarCircle";
import PreviousValueBlock from "./PreviousValueBlock";

const InputContainer = styled.View`
  padding: 0px 42px;
  margin-top: ${rpWidth(56)}px;
  margin-bottom: ${rpWidth(50)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const AvatarContainer = styled(RowContainer)`
  padding-right: ${rpWidth(30)}px;
  padding-left: ${rpWidth(37)}px;
  margin-top: ${rpWidth(51)}px;
`;

const RegisterProfileThird = ({ next }: { next: () => void }) => {
  const avatar = useAppSelector(state => state.form.avatar);
  const phoneNumber = useAppSelector(state => state.form.phoneNumber);
  const etc = useAppSelector(state => state.form.etc);
  const dispatch = useDispatch();

  const [updateProfile, profileResult] =
    deviceApi.useUpdateDeviceProfileMutation();
  const [updateAvatar, avatarResult] =
    deviceApi.useUpdateDeviceProfileAvatarMutation();

  const handleFormData = () => {
    if (!avatar) return;
    const image = new FormData();
    console.log(avatar);
    image.append(`image1`, {
      name: avatar.path.substring(avatar.path.lastIndexOf("/") + 1),
      type: avatar.mime,
      uri: isIos ? `file://${avatar.path}` : avatar.path,
      data: avatar?.data || null,
    });
    return image;
  };

  const registerProfile = () => {
    next();
    return;
    const {
      form: { name, birthYear, birthMonth, birthDay, gender, breed, weight },
      storage: {
        device: { deviceIdInProgress },
      },
    } = store.getState();
    updateAvatar({
      deviceId: 4,
      avatar: handleFormData() as FormData,
    })
      .unwrap()
      .then(() =>
        updateProfile()
          .unwrap()
          .then(() => {})
          .catch(err => {}),
      )
      .catch(err => {
        console.log(err);
        if (err.status === 404) {
          Alert.alert("경고", "디바이스가 존재하지 않습니다.");
        }
        if (err.status === 500) {
          Alert.alert(
            "경고",
            "알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.",
          );
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollContainer
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}>
        <View>
          <AvatarContainer>
            <AvatarCircle />
            <PreviousValueBlock />
          </AvatarContainer>
          <InputContainer>
            <InputTitle>보호자 연락처</InputTitle>
            <Input
              value={phoneNumber}
              onChangeText={text => dispatch(formActions.setPhoneNumber(text))}
              keyboardType="number-pad"
            />
            <InputTitle>기타사항</InputTitle>
            <Input
              value={etc}
              onChangeText={text => dispatch(formActions.setEtc(text))}
            />
          </InputContainer>
        </View>
        <Button
          /* disabled={!avatar || !phoneNumber || !etc} */
          isLoading={avatarResult.isLoading || profileResult.isLoading}
          useCommonMarginBottom
          onPress={() => {
            if (avatarResult.isLoading || profileResult.isLoading) return;
            registerProfile();
          }}>
          완료
        </Button>
      </KeyboardAwareScrollContainer>
    </SafeAreaView>
  );
};

export default RegisterProfileThird;
