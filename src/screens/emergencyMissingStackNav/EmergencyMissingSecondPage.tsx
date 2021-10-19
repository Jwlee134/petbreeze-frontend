import React, { useContext } from "react";
import ImageCropPicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import ScrollPicker from "~/components/common/ScrollPicker";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import Plus from "~/assets/svg/plus-circle-blue.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { Share } from "react-native";
import { EmergencyMissingSecondPageScreenNavigationProp } from "~/types/navigator";

const PaddingContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding: 0px ${rpWidth(42)}px;
    margin-top: ${rpWidth(28)}px;
  `}
`;

const PhotoContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(32)}px`};
`;

const RowContainer = styled.View`
  flex-direction: row;
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

const lostTimeArr: ["오전", "오후"] = ["오전", "오후"];

const EmergencyMissingSecondPage = ({
  navigation,
}: {
  navigation: EmergencyMissingSecondPageScreenNavigationProp;
}) => {
  const { lostHour, lostMinute, lostPlace, lostTime, message, photos } =
    useAppSelector(state => state.form);
  const dispatch = useDispatch();
  const { width, rpWidth } = useContext(DimensionsContext);

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

  const handleSubmit = () => {
    Share.share({
      message: "https://87dc-14-36-38-134.ngrok.io/lost/1",
    });
  };

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <PaddingContainer rpWidth={rpWidth}>
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
      <PhotoContainer rpWidth={rpWidth}>
        {photos.length
          ? photos.map((photo, i) => (
              <Photo
                source={{ uri: photo.path }}
                key={i}
                style={{
                  marginBottom:
                    i === photos.length - 1 && photos.length === 4
                      ? rpWidth(24)
                      : rpWidth(11),
                  height: (width - rpWidth(64)) * 0.67,
                }}
              />
            ))
          : null}
        {photos.length < 3 ? (
          <>
            <AddPhotoBox
              style={{ height: (width - rpWidth(64)) * (2 / 3) }}
              onPress={handleOpenPicker}>
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
      <Button useCommonMarginBottom onPress={handleSubmit}>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default EmergencyMissingSecondPage;
