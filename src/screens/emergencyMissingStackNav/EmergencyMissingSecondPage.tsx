import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import imageHandler from "~/utils/imageHandler";
import Modal from "react-native-modal";
import useModal, { ModalPosition } from "~/hooks/useModal";
import IosBottomModal from "~/components/modal/IosBottomModal";
import Divider from "~/components/common/Divider";
import palette from "~/styles/palette";
import { formActions } from "~/store/form";
import deviceApi from "~/api/device";
import { EmergencyMissingSecondPageScreenNavigationProp } from "~/types/navigator";
import IosBottomModalButton from "~/components/modal/IosBottomModalButton";

const PaddingContainer = styled.View`
  padding: 0 42px;
  margin-top: 50px;
`;

const PhotoContainer = styled.View`
  padding: 0 32px;
`;

const AddPhotoBox = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.02);
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

const Photo = styled.Image`
  width: 100%;
`;

const EmergencyMissingSecondPage = ({
  navigation,
  deviceID,
  isModify,
}: {
  navigation: EmergencyMissingSecondPageScreenNavigationProp;
  deviceID: number;
  isModify: boolean | undefined;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { open, close, modalProps } = useModal();

  const [register, { isLoading: loadingRegister }] =
    deviceApi.usePostEmergencyMissingMutation();
  const [updateAvatar, { isLoading: loadingAvatar }] =
    deviceApi.useUpdateEmergencyMissingThumbnailMutation();
  const [update, { isLoading: loadingUpdate }] =
    deviceApi.useUpdateEmergencyMissingMutation();
  const dispatch = useDispatch();

  const isLoading = loadingRegister || loadingAvatar || loadingUpdate;
  const { width } = useWindowDimensions();

  const {
    message,
    photos,
    lostPlace,
    lostMonth,
    lostDate,
    lostHour,
    lostMinute,
    phoneNumber,
    hasTag,
    emergencyKey,
  } = useAppSelector(state => state.form);

  const handleSubmit = async () => {
    const body = {
      message,
      missing_location: lostPlace,
      missing_datetime: new Date(
        new Date().getFullYear(),
        lostMonth - 1,
        lostDate,
        lostHour,
        lostMinute,
      ).toISOString(),
      contact_number: phoneNumber,
      has_dog_tag: hasTag,
    };
    let key = "";
    try {
      if (isModify) {
        await update({
          deviceID,
          body,
        }).unwrap();
        key = emergencyKey;
      } else {
        const data = await register({
          deviceID,
          body,
        }).unwrap();
        key = data.emergency_key;
      }
    } catch {
      return;
    }

    if (!photos.every(photo => photo.includes("amazonaws"))) {
      try {
        const generateKey = (i: number) => `image${i}_thumbnail`;
        const formData = imageHandler.handleFormData(photos, generateKey);
        await updateAvatar({ deviceID, body: formData }).unwrap();
      } catch {
        return;
      }
    }

    navigation.replace("UserRequestSuccess", {
      text: isModify ? "수정되었습니다." : "업로드 되었습니다.",
      key,
    });
  };

  const onMessageChange = (text: string) => {
    dispatch(formActions.setState({ message: text }));
  };

  const onPhotoClick = (index: number) => {
    setSelectedIndex(index);
    open();
  };

  const onPhotoChange = () => {
    imageHandler.openThreeTwoRatioCropper(photos, selectedIndex, close);
  };

  const onPhotoDelete = () => {
    const copy = [...photos];
    copy.splice(selectedIndex, 1);
    dispatch(formActions.setState({ photos: copy }));
    close();
  };

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View>
          <PaddingContainer>
            <InputTitle>메시지</InputTitle>
            <Input
              maxLength={512}
              value={message}
              onChangeText={onMessageChange}
              containerStyle={{ marginBottom: 40 }}
            />
          </PaddingContainer>
          <PhotoContainer>
            {photos.length
              ? photos.map((photo, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      onPhotoClick(i);
                    }}>
                    <Photo
                      source={{ uri: photo }}
                      style={{
                        marginBottom:
                          i === photos.length - 1 && photos.length === 4
                            ? 40
                            : 11,
                        height: (width - 64) * 0.67,
                      }}
                    />
                  </TouchableOpacity>
                ))
              : null}
            {photos.length < 4 ? (
              <>
                <AddPhotoBox
                  style={{ height: (width - 64) * (2 / 3) }}
                  onPress={() => {
                    imageHandler.openThreeTwoRatioCropper(photos);
                  }}>
                  <Plus />
                </AddPhotoBox>
                <MyText
                  color="rgba(0, 0, 0, 0.3)"
                  fontSize={14}
                  style={{
                    textAlign: "right",
                    marginTop: 8,
                    marginBottom: 24,
                  }}>
                  최대 4장까지 가능
                </MyText>
              </>
            ) : null}
          </PhotoContainer>
        </View>
        <Button
          isLoading={isLoading}
          disabled={!message || !photos.length}
          useCommonMarginBottom
          onPress={handleSubmit}>
          확인
        </Button>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps({ type: ModalPosition.Bottom })}>
        <IosBottomModal close={close}>
          <IosBottomModalButton onPress={onPhotoChange}>
            <MyText color={palette.blue_7b}>변경</MyText>
          </IosBottomModalButton>
          <Divider />
          <IosBottomModalButton isLast onPress={onPhotoDelete}>
            <MyText color={palette.red_f0}>삭제</MyText>
          </IosBottomModalButton>
        </IosBottomModal>
      </Modal>
    </>
  );
};

export default EmergencyMissingSecondPage;
