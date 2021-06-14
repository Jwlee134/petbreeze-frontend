import React from "react";
import styled, { css } from "styled-components/native";

import ImagePicker from "react-native-image-crop-picker";
import palette from "~/styles/palette";
import AddCircleButton from "./common/button/AddCircleButton";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";

const Container = styled.View`
  flex-direction: row;
  margin-top: 11px;
`;

const AddPhotoBox = styled.View`
  width: 83px;
  height: 83px;
  border-radius: 10px;
  background-color: ${palette.gray_e5};
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  margin-right: 8px;
`;

const Photo = styled.Image<{ isLast: boolean }>`
  width: 83px;
  height: 83px;
  border-radius: 10px;
  margin-right: 8px;
  ${({ isLast }) =>
    isLast &&
    css`
      margin-right: 25px;
    `}
`;

const UploadPhoto = () => {
  const photos = useAppSelector(state => state.animalInfo.photos);
  const dispatch = useDispatch();

  const handleSelectPhoto = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
      maxFiles: 5,
    }).then(images => {
      if (images.length === 0) return;
      dispatch(animalInfoActions.setPhotos(images));
    });
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={handleSelectPhoto}>
        <AddPhotoBox style={{ marginLeft: 25, marginRight: 8 }}>
          <AddCircleButton disabled size={26} />
        </AddPhotoBox>
      </TouchableWithoutFeedback>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {photos.map((photo, index) => (
          <Photo
            key={index}
            isLast={photos.length - 1 === index}
            source={{ uri: photo.path }}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default UploadPhoto;
