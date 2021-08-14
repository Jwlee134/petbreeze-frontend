import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { width } from "~/styles";
import Button from "../common/Button";
import KeyboardAwareScrollContainer from "../common/container/KeyboardAwareScrollContainer";
import SafeAreaContainer from "../common/container/SafeAreaContainer";
import Input from "../common/Input";
import { BigText } from "../init/Styles";

import ImagePicker from "react-native-image-crop-picker";
import { useState } from "react";
import { isIos } from "~/utils";
import { Alert } from "react-native";
import { commonActions } from "~/store/common";
import { storageActions } from "~/store/storage";
import deviceApi from "~/api/device";

const AvatarContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 1px;
  border-color: black;
`;

const SmallText = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
`;

const DeviceProfileForm = ({
  navigation,
  route,
  next,
}: {
  navigation?: any;
  route?: any;
  next?: () => void;
}) => {
  const { avatar, name, breed, age, weight, phoneNumber, caution } =
    useAppSelector(state => state.form);
  const dispatch = useDispatch();
  const deviceId = useAppSelector(
    state => state.storage.device.deviceIdInProgress,
  );
  const [updateProfile, profileResult] =
    deviceApi.useUpdateDeviceProfileMutation();
  const [updateAvatar, avatarResult] =
    deviceApi.useUpdateDeviceProfileAvatarMutation();

  const [loading, setLoading] = useState(false);

  const body = {
    name,
    age: Number(age),
    variety: breed,
    weight: Number(weight),
    contact_number1: phoneNumber[0].value,
    contact_number2: phoneNumber[1].value ? phoneNumber[1].value : null,
    precaution: caution,
  };

  const handleAvatarThumbnail = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      if (!image) return;
      dispatch(formActions.setAvatar(image));
    });
  };

  const handleFormData = () => {
    if (typeof avatar === "number") return;
    const image = new FormData();
    image.append(`image1`, {
      name: isIos
        ? avatar.filename
        : avatar.path.substring(avatar.path.lastIndexOf("/") + 1),
      type: avatar.mime,
      uri: isIos ? avatar.sourceURL : avatar.path,
      data: avatar?.data || null,
    });
    return image;
  };

  useEffect(() => {
    if (profileResult.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (profileResult.error) {
      if (profileResult.error.status === 400) {
        Alert.alert("잘못된 데이터입니다.");
      } else if (profileResult.error.status === 404) {
        Alert.alert("존재하지 않는 디바이스입니다.");
      }
    }
    if (profileResult.isSuccess) {
      if (navigation) {
        // navigation goBack
      } else {
        dispatch(commonActions.setPage("next"));
        dispatch(storageActions.setDeviceRegistrationStep("profile"));
      }
    }
  }, [profileResult]);

  useEffect(() => {
    if (avatarResult.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (avatarResult.error) {
      if (avatarResult.error.status === 400) {
        Alert.alert("잘못된 데이터입니다.");
      } else if (avatarResult.error.status === 404) {
        Alert.alert("존재하지 않는 디바이스입니다.");
      }
    }
    if (avatarResult.isSuccess) {
      updateProfile({
        deviceId: route.params.id ? route.params.id : deviceId,
        body,
      });
    }
  }, [avatarResult]);

  const handleSubmit = () => {
    dispatch(storageActions.setInit("init"));
    if (
      !name ||
      !breed ||
      !age ||
      !phoneNumber[0].value ||
      !caution ||
      !weight ||
      loading
    ) {
      return;
    }

    if (typeof avatar !== "number") {
      updateAvatar({
        deviceId: route.params.id ? route.params.id : deviceId,
        avatar: handleFormData() as FormData,
      });
      return;
    }
    updateProfile({
      deviceId: route.params.id ? route.params.id : deviceId,
      body,
    });
  };

  return (
    <SafeAreaContainer>
      <KeyboardAwareScrollContainer
        contentContainerStyle={{
          width,
          paddingHorizontal: 24,
        }}>
        <BigText style={{ marginBottom: 24 }}>
          반려동물 프로필을{"\n"}설정해주세요.
        </BigText>
        <AvatarContainer onPress={handleAvatarThumbnail} activeOpacity={1}>
          <Avatar
            source={
              typeof avatar === "number"
                ? avatar
                : { uri: isIos ? avatar.sourceURL : avatar.path }
            }
          />
          <SmallText>클릭하여 변경</SmallText>
        </AvatarContainer>
        <Input
          placeholder="이름*"
          value={name}
          onChangeText={text => dispatch(formActions.setName(text))}
        />
        <Input placeholder="품종*" value={breed} />
        <Input placeholder="나이*" value={age} keyboardType="number-pad" />
        <Input
          placeholder="몸무게(kg)*"
          value={weight}
          keyboardType="number-pad"
        />
        <Input
          placeholder="보호자 연락처 1*"
          value={phoneNumber[0].value}
          onChangeText={text =>
            dispatch(formActions.setPhoneNumber({ id: 0, text }))
          }
          keyboardType="number-pad"
        />
        <Input
          placeholder="보호자 연락처 2"
          value={phoneNumber[1].value}
          onChangeText={text =>
            dispatch(formActions.setPhoneNumber({ id: 1, text }))
          }
          keyboardType="number-pad"
        />
        <Input placeholder="특징/주의사항" value={caution} isMultiline />
        <Button
          style={{ marginBottom: 24 }}
          isLoading={loading}
          onPress={handleSubmit}>
          완료
        </Button>
      </KeyboardAwareScrollContainer>
    </SafeAreaContainer>
  );
};

export default DeviceProfileForm;
