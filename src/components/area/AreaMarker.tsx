import React from "react";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { Shadow } from "react-native-shadow-2";
import { StyleProp, ViewStyle } from "react-native";

const OuterMarker = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InnerMarker = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 8px;
  background-color: ${palette.blue_86};
`;

const AreaMarker = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <Shadow
    distance={30}
    startColor="rgba(0, 0, 0, 0.1)"
    viewStyle={{ borderRadius: 11 }}
    containerViewStyle={{
      position: "absolute",
      alignSelf: "center",
      top: "50%",
      marginTop: -11,
      ...(style as object),
    }}>
    <OuterMarker>
      <InnerMarker />
    </OuterMarker>
  </Shadow>
);

export default AreaMarker;
