import React from "react";
import ImageCropPicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import ScrollPicker from "~/components/common/ScrollPicker";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { rpWidth, width } from "~/styles";
import palette from "~/styles/palette";
import Plus from "~/assets/svg/plus-circle-blue.svg";

const PaddingContainer = styled.View`
  padding: 0px ${rpWidth(42)}px;
  margin-top: ${rpWidth(28)}px;
`;

const PhotoContainer = styled.View`
  padding: 0px ${rpWidth(32)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const AddPhotoBox = styled.TouchableOpacity`
  height: ${(width - rpWidth(64)) * (2 / 3)}px;
  background-color: rgba(0, 0, 0, 0.02);
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

const Photo = styled.Image`
  width: 100%;
  height: ${(width - rpWidth(64)) * (2 / 3)}px;
  margin-bottom: ${rpWidth(11)}px;
`;

const lostTimeArr = ["오전", "오후"];

const EmergencyMissingSecondPage = () => {
  const { lostHour, lostMinute, lostPlace, lostTime, message, photos } =
    useAppSelector(state => state.form);
  const dispatch = useDispatch();

  const handleOpenPicker = () => {
    ImageCropPicker.openPicker({
      mediaType: "photo",
      width: 1080,
      height: 720,
      cropping: true,
      cropperActiveWidgetColor: palette.blue_7b,
      showCropFrame: false,
      showCropGuidelines: false,
    }).then(image => {
      dispatch(formActions.setPhotos([...photos, image]));
    });
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <PaddingContainer>
        <InputTitle>잃어버린 시간</InputTitle>
        <RowContainer>
          <ScrollPicker
            data={lostTimeArr}
            width="25%"
            height={rpWidth(39)}
            style={{
              marginRight: "6.9%",
            }}
            selectedIndex={lostTimeArr.findIndex(item => item === lostTime)}
            onChange={index =>
              dispatch(formActions.setLostTime(lostTimeArr[index]))
            }
          />
          <Input
            value={lostHour}
            keyboardType="number-pad"
            onChangeText={text => dispatch(formActions.setLostHour(text))}
            solidPlaceholderTitle="시"
            containerStyle={{ width: "31%", marginRight: "6.9%" }}
            maxLength={2}
          />
          <Input
            value={lostMinute}
            keyboardType="number-pad"
            onChangeText={text => dispatch(formActions.setLostMinute(text))}
            solidPlaceholderTitle="분"
            containerStyle={{ width: "31%" }}
            maxLength={2}
          />
        </RowContainer>
        <InputTitle>잃어버린 장소</InputTitle>
        <Input
          value={lostPlace}
          onChangeText={text => dispatch(formActions.setLostPlace(text))}
        />
        <InputTitle>메시지</InputTitle>
        <Input
          value={message}
          onChangeText={text => dispatch(formActions.setMessage(text))}
          containerStyle={{ marginBottom: rpWidth(36) }}
        />
      </PaddingContainer>
      <PhotoContainer>
        {photos.length
          ? photos.map((photo, i) => (
              <Photo
                source={{ uri: photo.path }}
                key={i}
                style={{
                  marginBottom:
                    i === photos.length - 1 && photos.length === 4
                      ? rpWidth(37)
                      : rpWidth(11),
                }}
              />
            ))
          : null}
        {photos.length < 3 ? (
          <>
            <AddPhotoBox onPress={handleOpenPicker}>
              <Plus />
            </AddPhotoBox>
            <MyText
              color="rgba(0, 0, 0, 0.3)"
              fontSize={14}
              style={{
                textAlign: "right",
                marginTop: rpWidth(8),
                marginBottom: rpWidth(37),
              }}>
              최대 4장까지 가능
            </MyText>
          </>
        ) : null}
      </PhotoContainer>
      <Button useCommonMarginBottom>확인</Button>
    </KeyboardAwareScrollContainer>
  );
};

export default EmergencyMissingSecondPage;
