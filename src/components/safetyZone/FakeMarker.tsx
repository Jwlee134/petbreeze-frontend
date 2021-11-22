import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import Animated from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";

interface Props {
  mapPadding: {
    top: number;
    bottom: number;
  };
  style: { marginBottom: number };
}

const OuterMarker = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InnerMarker = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${palette.blue_7b};
`;

const FakeMarker = ({ mapPadding, style }: Props) => (
  <Animated.View
    pointerEvents="none"
    style={[
      {
        ...(StyleSheet.absoluteFill as object),
        marginTop: mapPadding.top,
      },
      style,
    ]}>
    <Shadow
      distance={30}
      startColor="rgba(0, 0, 0, 0.1)"
      viewStyle={{ borderRadius: 11 }}
      containerViewStyle={{
        position: "absolute",
        alignSelf: "center",
        top: "50%",
        marginTop: -11,
      }}>
      <OuterMarker>
        <InnerMarker />
      </OuterMarker>
    </Shadow>
  </Animated.View>
);

export default FakeMarker;
