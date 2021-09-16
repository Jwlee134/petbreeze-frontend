import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import styled from "styled-components/native";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import { useAppSelector } from "~/store";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";

interface IProps {
  snapPoints: number[];
  mapPadding: {
    top: number;
    bottom: number;
  };
}

const OuterMarker = styled.View`
  width: ${rpWidth(22)}px;
  height: ${rpWidth(22)}px;
  border-radius: ${rpWidth(11)}px;
  background-color: white;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InnerMarker = styled.View`
  width: ${rpWidth(16)}px;
  height: ${rpWidth(16)}px;
  border-radius: ${rpWidth(8)}px;
  background-color: ${palette.blue_7b};
`;

const FakeMarker = ({ mapPadding, snapPoints }: IProps) => {
  const step2 = useAppSelector(state => state.deviceSetting.safetyZone.step2);
  const value = useRef(new Animated.Value(0)).current;

  const exp = (t: number) => {
    return Math.min(Math.max(0, Math.pow(2, 10 * (t - 1))), 1);
  };

  const marginBottom = value.interpolate({
    inputRange: [0, 1],
    outputRange: [mapPadding.bottom, snapPoints[0] + rpWidth(36)],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: !step2 ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.out(exp),
    }).start();
  }, [step2, snapPoints]);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        ...(StyleSheet.absoluteFill as object),
        marginTop: mapPadding.top - rpWidth(46),
        marginBottom,
      }}>
      <ShadowContainer
        shadowRadius={12}
        shadowOpacity={0.3}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: -rpWidth(11),
          marginTop: -rpWidth(11),
        }}>
        <OuterMarker>
          <InnerMarker />
        </OuterMarker>
      </ShadowContainer>
    </Animated.View>
  );
};

export default FakeMarker;
