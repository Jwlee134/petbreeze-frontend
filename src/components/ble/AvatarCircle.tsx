import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import { useAppSelector } from "~/store";
import PlusCircle from "~/assets/svg/plus/plus-circle-blue.svg";
import imageHandler from "~/utils/imageHandler";
import { noAvatar } from "~/constants";
import { DimensionsContext, RpHeight } from "~/context/DimensionsContext";

const Container = styled.TouchableOpacity<{ rpHeight: RpHeight }>`
  ${({ rpHeight }) => css`
    width: ${rpHeight(124)}px;
    height: ${rpHeight(124)}px;
    border-radius: ${rpHeight(62)}px;
  `}
  background-color: rgba(0, 0, 0, 0.03);
  justify-content: center;
  align-items: center;
`;

const Svg = styled.View`
  position: absolute;
  bottom: 0;
`;

const Image = styled.Image<{ rpHeight: RpHeight }>`
  width: 100%;
  height: 100%;
  border-radius: ${({ rpHeight }) => rpHeight(62)}px;
`;

const AvatarCircle = () => {
  const photos = useAppSelector(state => state.form.photos);
  const { rpHeight } = useContext(DimensionsContext);

  return (
    <Container rpHeight={rpHeight} onPress={imageHandler.openCircleCropper}>
      <Image
        rpHeight={rpHeight}
        source={!photos[0] ? noAvatar : { uri: photos[0] }}
      />
      <Svg style={{ right: rpHeight(10) }}>
        <PlusCircle width={rpHeight(28)} height={rpHeight(28)} />
      </Svg>
    </Container>
  );
};

export default AvatarCircle;
