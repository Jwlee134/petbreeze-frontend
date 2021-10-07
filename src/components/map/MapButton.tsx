import React, { useContext } from "react";
import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";
import ShadowContainer from "../common/container/ShadowContainer";

import MyLocation from "~/assets/svg/common/my-location.svg";
import Footprint from "~/assets/svg/common/footprint.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

interface IProps extends TouchableOpacityProps {
  icon: "myLocation" | "footprint";
  style?: StyleProp<ViewStyle>;
}

const Container = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(48)}px;
    height: ${rpWidth(48)}px;
    border-radius: ${rpWidth(24)}px;
  `}
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const MapButton = ({ icon, style, ...props }: IProps) => {
  const { rpHeight, rpWidth } = useContext(DimensionsContext);

  return (
    <ShadowContainer style={style} shadowOpacity={0.25} shadowRadius={5}>
      <Container rpWidth={rpWidth} {...props}>
        {icon === "footprint" ? (
          <Footprint width={rpWidth(24)} height={rpHeight(23)} />
        ) : (
          <MyLocation width={rpWidth(27)} height={rpWidth(27)} />
        )}
      </Container>
    </ShadowContainer>
  );
};

export default MapButton;
