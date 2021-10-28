import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { TouchableOpacity, View } from "react-native";
import { EmergencyMissingSecondPageScreenNavigationProp } from "~/types/navigator";
import { deviceSettingActions } from "~/store/deviceSetting";
import imageHandler from "~/utils/imageHandler";
import deviceApi from "~/api/device";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import IosStyleBottomModal from "~/components/modal/IosStyleBottomModal";
import Divider from "~/components/common/Divider";
import palette from "~/styles/palette";
import useError from "~/hooks/useError";

const PaddingContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding: 0px ${rpWidth(42)}px;
    margin-top: ${rpWidth(50)}px;
  `}
`;

const PhotoContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(32)}px`};
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

const ModalButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(50)}px;
  justify-content: center;
  align-items: center;
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
  } = useAppSelector(state => state.deviceSetting.profile);
  const dispatch = useDispatch();
  const { width, rpWidth } = useContext(DimensionsContext);
  const [register, { error: postError }] =
    deviceApi.usePostEmergencyMissingMutation();
  const [updateAvatar, { error: patchError }] =
    deviceApi.useUpdateEmergencyMissingThumbnailMutation();
  const [update, { error: putError }] =
    deviceApi.useUpdateEmergencyMissingMutation();
  const [loading, setLoading] = useState(false);
  const { open, close, modalProps } = useModal();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const callback = () => {
    navigation.replace("BottomTabNav");
  };

  useError({ error: patchError, type: "Device", callback });
  useError({ error: putError, type: "Device", callback });
  useError({ error: postError, type: "Device", callback });

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

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

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View>
          <PaddingContainer rpWidth={rpWidth}>
            <InputTitle>메시지</InputTitle>
            <Input
              maxLength={512}
              value={message}
              onChangeText={text =>
                dispatch(
                  deviceSettingActions.setProfile({
                    message: text,
                  }),
                )
              }
              containerStyle={{ marginBottom: rpWidth(40) }}
            />
          </PaddingContainer>
          <PhotoContainer rpWidth={rpWidth}>
            {photos.length
              ? photos.map((photo, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setSelectedIndex(i);
                      open();
                    }}>
                    <Photo
                      source={{ uri: photo }}
                      style={{
                        marginBottom:
                          i === photos.length - 1 && photos.length === 4
                            ? rpWidth(40)
                            : rpWidth(11),
                        height: (width - rpWidth(64)) * 0.67,
                      }}
                    />
                  </TouchableOpacity>
                ))
              : null}
            {photos.length < 4 ? (
              <>
                <AddPhotoBox
                  style={{ height: (width - rpWidth(64)) * (2 / 3) }}
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
                    marginTop: rpWidth(8),
                    marginBottom: rpWidth(24),
                  }}>
                  최대 4장까지 가능
                </MyText>
              </>
            ) : null}
          </PhotoContainer>
        </View>
        <Button
          isLoading={loading}
          disabled={!message || !photos.length}
          useCommonMarginBottom
          onPress={handleSubmit}>
          확인
        </Button>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps({ type: "bottom" })}>
        <IosStyleBottomModal close={close}>
          <ModalButton
            onPress={() => {
              imageHandler.openThreeTwoRatioCropper(
                photos,
                selectedIndex,
                close,
              );
            }}
            rpWidth={rpWidth}>
            <MyText color={palette.blue_7b}>변경</MyText>
          </ModalButton>
          <Divider />
          <ModalButton
            onPress={() => {
              const copy = [...photos];
              copy.splice(selectedIndex, 1);
              dispatch(
                deviceSettingActions.setProfile({
                  photos: copy,
                }),
              );
              close();
            }}
            rpWidth={rpWidth}>
            <MyText color={palette.red_f0}>삭제</MyText>
          </ModalButton>
        </IosStyleBottomModal>
      </Modal>
    </>
  );
};

export default EmergencyMissingSecondPage;
