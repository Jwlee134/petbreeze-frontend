import React from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import PlusCircle from "~/assets/svg/plus/plus-circle-blue.svg";
import imageHandler from "~/utils/imageHandler";
import { noAvatar } from "~/constants";

const Container = styled.TouchableOpacity`
  width: 124px;
  height: 124px;
  border-radius: 62px;
  background-color: rgba(0, 0, 0, 0.03);
  justify-content: center;
  align-items: center;
`;

const Svg = styled.View`
  position: absolute;
  bottom: 0;
  right: 10px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 62px;
`;

const AvatarCircle = () => {
  const photos = useAppSelector(state => state.form.photos);

  return (
    <Container onPress={imageHandler.openCircleCropper}>
      <Image source={!photos[0] ? noAvatar : { uri: photos[0] }} />
      <Svg>
        <PlusCircle width={28} height={28} />
      </Svg>
    </Container>
  );
};

export default AvatarCircle;
