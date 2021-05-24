import React, { useState } from "react";
import styled from "styled-components/native";

import ImagePicker from "react-native-image-crop-picker";
import palette from "~/styles/palette";
import AddCircleButton from "../common/AddCircleButton";
import { TouchableWithoutFeedback } from "react-native";

const Container = styled.ScrollView`
  margin-top: 11px;
`;

const AddPhotoBox = styled.View`
  width: 83px;
  height: 83px;
  border-radius: 10px;
  background-color: ${palette.grey};
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  margin-right: 8px;
`;

const UploadPhoto = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSelectPhoto = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
    }).then(images => console.log(images));
  };

  return (
    <Container horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={handleSelectPhoto}>
        <AddPhotoBox style={{ marginLeft: 25, marginRight: 8 }}>
          <AddCircleButton disabled size={26} />
        </AddPhotoBox>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default UploadPhoto;
