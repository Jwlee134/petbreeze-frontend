import React from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import { rpHeight, rpWidth } from "~/styles";
import PlusCircle from "~/assets/svg/plus-circle-blue.svg";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import { formActions } from "~/store/form";
import palette from "~/styles/palette";

const Container = styled.TouchableOpacity<{ noImg: boolean }>`
  width: ${rpWidth(124)}px;
  height: ${rpWidth(124)}px;
  border-radius: ${rpWidth(62)}px;
  background-color: rgba(0, 0, 0, 0.03);
  justify-content: center;
  align-items: center;
`;

const Svg = styled.View`
  position: absolute;
  bottom: 0;
  right: ${rpWidth(10)}px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${rpHeight(62)}px;
`;

const AvatarCircle = () => {
  const avatar = useAppSelector(state => state.form.avatar);
  const dispatch = useDispatch();

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 640,
      height: 640,
      cropping: true,
      cropperCircleOverlay: true,
      cropperActiveWidgetColor: palette.blue_7b,
      showCropFrame: false,
      showCropGuidelines: false,
    }).then(image => {
      if (!image) return;
      dispatch(formActions.setAvatar(image));
    });
  };

  return (
    <Container onPress={openPicker} noImg={!avatar}>
      {!avatar ? (
        <FootprintOutline
          width={rpWidth(77)}
          height={rpWidth(74)}
          opacity={0.3}
        />
      ) : (
        <Image source={{ uri: avatar.path }} />
      )}
      <Svg>
        <PlusCircle width={rpWidth(28)} height={rpWidth(28)} />
      </Svg>
    </Container>
  );
};

export default AvatarCircle;
