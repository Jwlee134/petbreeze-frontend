import React, { memo } from "react";
import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import styled from "styled-components/native";
import Live from "~/assets/svg/mapButton/live.svg";
import MyLocation from "~/assets/svg/mapButton/my-location.svg";
import { MAP_BUTTON_SIZE } from "~/styles/constants";
import { Shadow } from "react-native-shadow-2";

interface Props extends TouchableOpacityProps {
  icon: "myLocation" | "live";
  style?: StyleProp<ViewStyle>;
}

const Container = styled.TouchableOpacity`
  width: ${MAP_BUTTON_SIZE}px;
  height: ${MAP_BUTTON_SIZE}px;
  border-radius: ${MAP_BUTTON_SIZE / 2}px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const MapButton = ({ icon, style, ...props }: Props) => (
  <Shadow
    distance={10}
    startColor="rgba(0, 0, 0, 0.05)"
    containerViewStyle={style}
    viewStyle={{
      borderRadius: MAP_BUTTON_SIZE / 2,
    }}>
    <Container {...props}>
      {icon === "live" ? <Live /> : <MyLocation />}
    </Container>
  </Shadow>
);

export default memo(MapButton);
