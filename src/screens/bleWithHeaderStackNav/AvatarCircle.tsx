import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import { useAppSelector } from "~/store";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import PlusCircle from "~/assets/svg/plus-circle-blue.svg";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import palette from "~/styles/palette";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const Container = styled.TouchableOpacity<{ noImg: boolean; rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(124)}px;
    height: ${rpWidth(124)}px;
    border-radius: ${rpWidth(62)}px;
  `}
  background-color: rgba(0, 0, 0, 0.03);
  justify-content: center;
  align-items: center;
`;

const Svg = styled.View<{ rpWidth: RpWidth }>`
  position: absolute;
  bottom: 0;
  right: ${({ rpWidth }) => rpWidth(10)}px;
`;

const Image = styled.Image<{ rpWidth: RpWidth }>`
  width: 100%;
  height: 100%;
  border-radius: ${({ rpWidth }) => rpWidth(62)}px;
`;

const AvatarCircle = () => {
  const avatar = useAppSelector(state => state.form.avatar);
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);

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
    <Container rpWidth={rpWidth} onPress={openPicker} noImg={!avatar}>
      {!avatar ? (
        <FootprintOutline
          width={rpWidth(77)}
          height={rpWidth(74)}
          opacity={0.3}
        />
      ) : (
        <Image rpWidth={rpWidth} source={{ uri: avatar.path }} />
      )}
      <Svg rpWidth={rpWidth}>
        <PlusCircle width={rpWidth(28)} height={rpWidth(28)} />
      </Svg>
    </Container>
  );
};

export default AvatarCircle;
