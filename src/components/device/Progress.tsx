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
import palette from "~/styles/palette";
import Button from "../common/Button";
import { Status } from "~/hooks/useBleManager";
import useDisableButton from "~/hooks/useDisableButton";

const DownloadingView = styled.View`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const DownloadProgress = styled(Animated.View)`
  background-color: ${palette.blue_6e};
  height: 40px;
`;

const Progress = ({
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
  const { disable, disabled } = useDisableButton();

  const widthInterpolate = value.interpolate({
    inputRange: [0, progress],
    outputRange: ["0%", `${progress}%`],
  });

  Animated.timing(value, {
    toValue: progress,
    duration: 500,
    easing: Easing.ease,
    useNativeDriver: false,
  }).start();

  return (
    <Container>
      <TopContainer>
        {(status.value === "searching" ||
          status.value === "installing" ||
          status.value === "connected") && <Loading />}
        {status.value.includes("Fail") && <Fail />}
        {status.value.includes("completed") && <Success />}
        {status.value === "downloading" && (
          <>
            <DownloadingView>
              <DownloadProgress style={{ width: widthInterpolate }} />
            </DownloadingView>
          </>
        )}
        <BigText>{status.text}</BigText>
      </TopContainer>
      <BottomContainer flexEnd>
        {status.value.includes("Fail") && (
          <Button
            background="transparent"
            onPress={() => {
              if (
                status.value === "connectFailed" ||
                status.value === "notifFailed"
              ) {
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
        {status.value.includes("completed") && (
          <Button
            text="다음"
            onPress={() => {
              if (disabled) return;
              handleComplete();
              disable();
            }}
          />
        )}
      </BottomContainer>
    </Container>
  );
};

export default Progress;
