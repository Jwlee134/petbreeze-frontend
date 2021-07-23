import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { width } from "~/styles";
import Button from "../common/Button";
import KeyboardAwareScrollContainer from "../common/container/KeyboardAwareScrollContainer";
import SafeAreaContainer from "../common/container/SafeAreaContainer";
import Input from "../common/Input";
import { BigText } from "../initialization/Styles";

import ImagePicker from "react-native-image-crop-picker";
import { useState } from "react";
import { commonActions } from "~/store/common";
import { isIos } from "~/utils";
import { useUpdateDeviceProfileAvatarMutation } from "~/api/device";
import useDisableButton from "~/hooks/useDisableButton";

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
  handleComplete,
}: {
  handleComplete?: () => void;
}) => {
  const { avatar, name, breed, age, weight, phoneNumber, caution } =
    useAppSelector(state => state.form);
  const dispatch = useDispatch();
  const [updateAvatar] = useUpdateDeviceProfileAvatarMutation();
  const { disable, disabled } = useDisableButton();

  const [loading, setLoading] = useState(true);

  const handleAvatar = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      if (!image) return;
      dispatch(formActions.setAvatar(image));
    });
  };

  const handlePatchAvatar = () => {
    const image = new FormData();
    image.append(`image1`, {
      name: isIos
        ? avatar.filename
        : avatar.path.substring(avatar.path.lastIndexOf("/") + 1),
      type: avatar.mime,
      uri: isIos ? avatar.sourceURL : avatar.path,
      data: avatar?.data || null,
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
        <AvatarContainer onPress={handleAvatar} activeOpacity={1}>
          <Avatar source={avatar} />
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
          text="완료"
          onPress={() => {
            if (disabled) return;
            handleComplete && handleComplete();
            disable();
          }}
        />
      </KeyboardAwareScrollContainer>
    </SafeAreaContainer>
  );
};

export default DeviceProfileForm;
