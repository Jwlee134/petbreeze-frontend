import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import { useAppSelector } from "~/store";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import PlusCircle from "~/assets/svg/plus/plus-circle-blue.svg";

import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import imageHandler from "~/utils/imageHandler";

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
  const photos = useAppSelector(state => state.deviceSetting.profile.photos);
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container
      rpWidth={rpWidth}
      onPress={imageHandler.openCircleCropper}
      noImg={!photos[0]}>
      {!photos[0] ? (
        <FootprintOutline
          width={rpWidth(77)}
          height={rpWidth(74)}
          opacity={0.3}
        />
      ) : (
        <Image rpWidth={rpWidth} source={{ uri: photos[0] }} />
      )}
      <Svg rpWidth={rpWidth}>
        <PlusCircle width={rpWidth(28)} height={rpWidth(28)} />
      </Svg>
    </Container>
  );
};

export default AvatarCircle;
