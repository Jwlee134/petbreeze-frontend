import React, { useRef } from "react";
import styled from "styled-components/native";
import { Animated, Easing } from "react-native";
import {
  BigText,
  BottomContainer,
  Container,
  TopContainer,
} from "../initialization/Styles";
import Fail from "../lottie/Fail";
import Loading from "../lottie/Loading";
import Success from "../lottie/Success";
import SubmitDeviceInfo from "./SubmitDeviceInfo";
import palette from "~/styles/palette";
import Button from "../common/Button";
import { Status } from "~/types";

const DownloadingView = styled.View`
  width: 100%;
  height: 40px;
  margin: 20px 0px;
  border-radius: 20px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Progress = styled(Animated.View)`
  background-color: ${palette.blue_6e};
  height: 40px;
`;

const InteractionWithDevice = ({
  handleComplete,
  status,
  setStatus,
  progress,
}: {
  handleComplete: () => void;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  progress: number;
}) => {
  const value = useRef(new Animated.Value(0)).current;

  const widthInterpolate = value.interpolate({
    inputRange: [0, progress],
    outputRange: ["0%", `${progress}%`],
  });

  Animated.timing(value, {
    toValue: progress,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  return status.value === "profile" ? (
    <SubmitDeviceInfo />
  ) : (
    <Container>
      <TopContainer>
        {(status.value === "searching" || status.value === "installing") && (
          <Loading />
        )}
        {status.value.includes("Fail") && <Fail />}
        {(status.value === "connected" || status.value === "completed") && (
          <Success />
        )}
        {status.value === "downloading" && (
          <DownloadingView>
            <Progress style={{ width: widthInterpolate }} />
          </DownloadingView>
        )}
        <BigText>{status.text}</BigText>
      </TopContainer>
      <BottomContainer flexEnd>
        {status.value.includes("Fail") && (
          <Button
            background="transparent"
            onPress={() => {
              if (status.value === "connectFailed") {
                setStatus({
                  value: "searching",
                  text: "디바이스 검색 중...",
                });
              }
              if (status.value === "downloadFailed") {
                setStatus({
                  value: "downloading",
                  text: "펌웨어 다운로드 중...",
                });
              }
            }}
            text="다시 시도"
          />
        )}
        {status.value === "completed" && (
          <Button text="다음" onPress={handleComplete} />
        )}
      </BottomContainer>
    </Container>
  );
};

export default InteractionWithDevice;
