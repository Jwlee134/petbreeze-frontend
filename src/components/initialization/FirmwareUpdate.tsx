import React, { useRef } from "react";
import { Animated, Easing, StatusBar } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding: 48px;
`;

const Background = styled.ImageBackground`
  flex: 1;
`;

const Text = styled.Text`
  color: black;
  margin-bottom: 18px;
  font-size: 16px;
`;

const Bar = styled.View`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const Progress = styled(Animated.View)`
  height: 8px;
  background-color: ${palette.blue_6e};
`;

const FirmwareUpdate = ({ progress }: { progress: number }) => {
  const value = useRef(new Animated.Value(0)).current;

  const widthInterpolate = value.interpolate({
    inputRange: [0, progress],
    outputRange: ["0%", `${progress}%`],
  });

  Animated.timing(value, {
    toValue: progress,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: false,
  }).start();

  return (
    <Container>
      <Text>업데이트 확인 중...</Text>
      <Bar>
        <Progress style={{ width: widthInterpolate }} />
      </Bar>
    </Container>
  );
};

export default FirmwareUpdate;
