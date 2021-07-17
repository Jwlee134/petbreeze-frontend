import React from "react";
import { useDispatch } from "react-redux";
import useBleMaganer from "~/hooks/useBleManager";
import { commonActions } from "~/store/common";
import { storageActions } from "~/store/storage";
import BluetoothCheck from "./BluetoothCheck";
import Progress from "./Progress";

const DeviceInteraction = () => {
  const dispatch = useDispatch();
  const { status, setStatus, progress, disconnect } = useBleMaganer();

  return (
    <>
      <BluetoothCheck
        handleNext={() => {
          dispatch(commonActions.setPage("next"));
          setStatus({
            value: "downloading",
            text: "펌웨어 다운로드 중...",
          });
        }}
      />
      <Progress
        status={status}
        setStatus={setStatus}
        progress={progress}
        handleComplete={async () => {
          await disconnect();
          if (status.value === "completedWith200") {
            dispatch(storageActions.setInitialization("initialization"));
          } else {
            dispatch(commonActions.setPage("next"));
            dispatch(storageActions.setInitialization("device"));
          }
        }}
      />
    </>
  );
};

export default DeviceInteraction;
