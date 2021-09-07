import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useBleMaganer from "~/hooks/useBleManager";
import { useAppSelector } from "~/store";
import { commonActions } from "~/store/common";
import Fail from "./Fail";
import FirmwareProgress from "./FirmwareProgress";
import Scanning from "./Scanning";
import Success from "./Success";

const BleProgress = ({ navigation, route }) => {
  const bleStatus = useAppSelector(state => state.common.bleStatus);
  const dispatch = useDispatch();
  const { downloadingProgress, installingProgress } = useBleMaganer({
    /* isOtaUpdate, */
  });

  const retry = useCallback(() => {
    switch (bleStatus) {
      case "scanningFail":
        dispatch(commonActions.setBleStatus("scanning"));
        break;
      case "downloadingFail":
        dispatch(commonActions.setBleStatus("firmwareDownloading"));
        break;
      case "notificationFail":
        dispatch(commonActions.setBleStatus("scanning"));
        break;
    }
  }, [bleStatus]);

  return (
    <>
      {bleStatus === "scanning" && <Scanning />}
      {bleStatus.includes("firmware") && (
        <FirmwareProgress
          title={
            bleStatus === "firmwareDownloading"
              ? "펌웨어 다운로드중"
              : "펌웨어 설치중"
          }
          progress={
            bleStatus === "firmwareDownloading"
              ? downloadingProgress
              : installingProgress
          }
        />
      )}
      {bleStatus.includes("Success") && <Success status={bleStatus} />}
      {bleStatus.includes("Fail") && <Fail status={bleStatus} retry={retry} />}
    </>
  );
};

export default BleProgress;
