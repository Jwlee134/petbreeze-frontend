import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import CodePush, { DownloadProgress } from "react-native-code-push";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import AnimatedPoints from "~/components/common/AnimatedPoints";
import FootPrint from "~/assets/svg/footprint/footprint-outline-white.svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import GradientContainer from "~/components/common/container/GradientContainer";
import { FirmwareUpdateScreenNavigationProp } from "~/types/navigator";
import { delay } from "~/utils";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";

const HalfContainer = styled.View`
  flex: 1;
`;

const FirmwareUpdate = ({
  navigation,
}: {
  navigation: FirmwareUpdateScreenNavigationProp;
}) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [text, setText] = useState("업데이트 확인 중");

  const [point1, point2, point3] = useAnimatedSequence({
    numOfValues: 3,
    loop: true,
    delayAfterMount: 600,
    firstDuration: 400,
    delayAfterFirst: 800,
    secondDuration: 400,
    delayAfterSecond: 800,
    thirdDuration: 400,
    delayAfterThird: 800,
    resetDuration: 400,
    delayAfterReset: 800,
  });

  const handleStatus = async (status: CodePush.SyncStatus) => {
    switch (status) {
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setText("업데이트 다운로드 중");
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setText("업데이트 설치 중");
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setProgress(100);
        dispatch(
          storageActions.setInit({
            isCodePushUpdated: true,
          }),
        );
        await delay(500);
        navigation.replace("Intro");
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        dispatch(
          storageActions.setInit({
            isCodePushUpdated: true,
          }),
        );
        await delay(500);
        CodePush.restartApp();
        break;
      default:
        break;
    }
  };

  const handleDownloadProgress = (progress: DownloadProgress) => {
    setProgress(
      Math.floor((progress.receivedBytes / progress.totalBytes) * 100),
    );
  };

  useEffect(() => {
    CodePush.sync({}, handleStatus, handleDownloadProgress);
  }, []);

  return (
    <GradientContainer style={{ alignItems: "center" }}>
      <HalfContainer style={{ justifyContent: "flex-end" }}>
        <AnimatedCircularProgress
          style={{
            marginBottom: 60,
          }}
          tintColor="white"
          size={160}
          width={7}
          fill={progress}
          lineCap="round"
          rotation={0}>
          {() => <FootPrint width={75} height={72} />}
        </AnimatedCircularProgress>
      </HalfContainer>
      <HalfContainer>
        <AnimatedPoints
          value1={point1}
          value2={point2}
          value3={point3}
          text={text}
          fontSize={24}
          color="white"
        />
      </HalfContainer>
    </GradientContainer>
  );
};

export default FirmwareUpdate;
