import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import CodePush, { DownloadProgress } from "react-native-code-push";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import MyText from "~/components/common/MyText";
import FootPrint from "~/assets/svg/footprint/footprint-outline-white.svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import GradientContainer from "~/components/common/container/GradientContainer";
import { FirmwareUpdateScreenNavigationProp } from "~/types/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";

const HalfContainer = styled.View`
  flex: 1;
`;

const FirmwareUpdate = ({
  navigation,
}: {
  navigation: FirmwareUpdateScreenNavigationProp;
}) => {
  const { rpWidth } = useContext(DimensionsContext);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const handleStatus = (status: CodePush.SyncStatus) => {
    switch (status) {
      case CodePush.SyncStatus.UP_TO_DATE:
        setProgress(100);
        dispatch(
          storageActions.setInit({
            isCodePushUpdated: true,
          }),
        );
        setTimeout(() => {
          navigation.navigate("Start");
        }, 500);
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        dispatch(
          storageActions.setInit({
            isCodePushUpdated: true,
          }),
        );
        setTimeout(() => {
          CodePush.restartApp();
        }, 500);
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
    //if (!isCodePushUpdated) {
    CodePush.sync({}, handleStatus, handleDownloadProgress);
    /* } else {
      CodePush.sync();
    } */
  }, []);

  return (
    <GradientContainer style={{ alignItems: "center" }}>
      <HalfContainer style={{ justifyContent: "flex-end" }}>
        <AnimatedCircularProgress
          style={{
            marginBottom: rpWidth(60),
          }}
          tintColor="white"
          size={rpWidth(160)}
          width={rpWidth(7)}
          fill={progress}
          lineCap="round"
          rotation={0}>
          {() => <FootPrint width={rpWidth(75)} height={rpWidth(72)} />}
        </AnimatedCircularProgress>
      </HalfContainer>
      <HalfContainer>
        <MyText fontSize={24} color="white">
          업데이트 중
        </MyText>
      </HalfContainer>
    </GradientContainer>
  );
};

export default FirmwareUpdate;
