import React from "react";
import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import styled from "styled-components/native";

import MyLocation from "~/assets/svg/common/my-location.svg";
import Footprint from "~/assets/svg/common/footprint.svg";
import { mapButtonSize } from "~/styles/constants";
import { Shadow } from "react-native-shadow-2";

interface Props extends TouchableOpacityProps {
  icon: "myLocation" | "footprint";
  style?: StyleProp<ViewStyle>;
}

const Container = styled.TouchableOpacity`
  width: ${mapButtonSize}px;
  height: ${mapButtonSize}px;
  border-radius: ${mapButtonSize / 2}px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const MapButton = ({ icon, style, ...props }: Props) => (
  <Shadow
    distance={10}
    startColor="rgba(0, 0, 0, 0.05)"
    viewStyle={{
      ...(style as object),
      borderRadius: mapButtonSize / 2,
    }}>
    <Container {...props}>
      {icon === "footprint" ? (
        <Footprint width={24} height={23} />
      ) : (
        <MyLocation width={27} height={27} />
      )}
    </Container>
  </Shadow>
);

export default MapButton;
