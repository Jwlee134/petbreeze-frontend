import React from "react";
import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { rpHeight, rpWidth } from "~/styles";
import ShadowContainer from "./container/ShadowContainer";

import MyLocation from "~/assets/svg/common/my-location.svg";
import Footprint from "~/assets/svg/common/footprint.svg";

interface IProps extends TouchableOpacityProps {
  icon: "myLocation" | "footprint";
  style?: StyleProp<ViewStyle>;
}

const Container = styled.TouchableOpacity`
  width: ${rpWidth(48)}px;
  height: ${rpWidth(48)}px;
  border-radius: ${rpWidth(24)}px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const MapFloatingCircle = ({ icon, style, ...props }: IProps) => (
  <ShadowContainer style={style} shadowOpacity={0.25} shadowRadius={5}>
    <Container {...props}>
      {icon === "footprint" ? (
        <Footprint width={rpWidth(24)} height={rpHeight(23)} />
      ) : (
        <MyLocation width={rpWidth(27)} height={rpWidth(27)} />
      )}
    </Container>
  </ShadowContainer>
);

export default MapFloatingCircle;
