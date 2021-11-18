import React, { useContext } from "react";
import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";

import MyLocation from "~/assets/svg/common/my-location.svg";
import Footprint from "~/assets/svg/common/footprint.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { mapButtonSize } from "~/styles/constants";
import { Shadow } from "react-native-shadow-2";

interface Props extends TouchableOpacityProps {
  icon: "myLocation" | "footprint";
  style?: StyleProp<ViewStyle>;
}

const Container = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(mapButtonSize)}px;
    height: ${rpWidth(mapButtonSize)}px;
    border-radius: ${rpWidth(mapButtonSize / 2)}px;
  `}
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const MapButton = ({ icon, style, ...props }: Props) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Shadow
      distance={8}
      startColor="rgba(0, 0, 0, 0.15)"
      viewStyle={{
        ...(style as object),
        borderRadius: rpWidth(mapButtonSize / 2),
      }}>
      <Container rpWidth={rpWidth} {...props}>
        {icon === "footprint" ? (
          <Footprint width={rpWidth(24)} height={rpWidth(23)} />
        ) : (
          <MyLocation width={rpWidth(27)} height={rpWidth(27)} />
        )}
      </Container>
    </Shadow>
  );
};

export default MapButton;
