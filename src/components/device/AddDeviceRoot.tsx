import React, { useCallback } from "react";
import { useState } from "react";
import useBleMaganer from "~/hooks/useBleManager";
import { useAppSelector } from "~/store";
import BluetoothCheck from "./BluetoothCheck";
import DeviceProfileForm from "./DeviceProfileForm";
import Fail from "./Fail";
import FirmwareProgress from "./FirmwareProgress";
import PreSafetyZoneMap from "./PreSafetyZoneMap";
import PreStart from "./PreStart";
import SafetyZoneMap from "./SafetyZoneMap";
import Scanning from "./Scanning";
import Success from "./Success";

interface IProps {
  isOtaUpdate?: boolean;
  next: () => void;
  ScreenWidthContainer: ({
    children,
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
}

const AddDeviceRoot = ({
  isOtaUpdate = false,
  next,
  ScreenWidthContainer,
}: IProps) => {
  const isDeviceRegistered = useAppSelector(
    state => state.storage.device.isDeviceRegistered,
  );
  const isSafetyZoneRegistered = useAppSelector(
    state => state.storage.device.isSafetyZoneRegistered,
  );
  const isProfileRegistered = useAppSelector(
    state => state.storage.device.isProfileRegistered,
  );
  const { status, setStatus, downloadingProgress, installingProgress } =
    useBleMaganer({
      isOtaUpdate,
    });

  const [renderPreStart] = useState(!isDeviceRegistered);
  const [renderBluetoothCheck, setRenderBluetoothCheck] = useState(false);
  const [renderProgress, setRenderProgress] = useState(false);
  const [renderPreSafetyZoneMap, setRenderPreSafetyZoneMap] = useState(
    isDeviceRegistered && !isSafetyZoneRegistered,
  );
  const [renderSafetyZoneMap, setRenderSafetyZoneMap] = useState(false);
  const [renderProfleForm, setRenderProfileForm] = useState(
    isDeviceRegistered && isSafetyZoneRegistered && !isProfileRegistered,
  );

  const handlePreRenderBluetoothCheck = useCallback(
    () => setRenderBluetoothCheck(true),
    [],
  );
  const handlePreRenderProgress = useCallback(
    () => setRenderProgress(true),
    [],
  );
  const handleBluetoothCheckNext = useCallback(() => {
    next();
    setStatus("scanning");
  }, []);
  const handleRetry = useCallback(() => {
    switch (status) {
      case "scanningFail":
        setStatus("scanning");
        break;
      case "downloadingFail":
        setStatus("firmwareDownloading");
        break;
      case "notificationFail":
        setStatus("scanning");
        break;
    }
  }, [status]);
  const handlePreRenderPreSafetyZoneMap = useCallback(
    () => setRenderPreSafetyZoneMap(true),
    [],
  );
  const handlePreRenderSafetyZoneMap = useCallback(
    () => setRenderSafetyZoneMap(true),
    [],
  );
  const handlePreRenderProfileForm = useCallback(
    () => setRenderProfileForm(true),
    [],
  );

  return (
    <>
      {renderPreStart && (
        <ScreenWidthContainer>
          <PreStart
            handleNext={next}
            handlePreRender={handlePreRenderBluetoothCheck}
          />
        </ScreenWidthContainer>
      )}
      {renderBluetoothCheck && (
        <ScreenWidthContainer>
          <BluetoothCheck
            handlePreRender={handlePreRenderProgress}
            handleNext={handleBluetoothCheckNext}
          />
        </ScreenWidthContainer>
      )}
      {renderProgress && (
        <ScreenWidthContainer>
          {status === "scanning" && <Scanning />}
          {status.includes("firmware") && (
            <FirmwareProgress
              title={
                status === "firmwareDownloading"
                  ? "펌웨어 다운로드중"
                  : "펌웨어 설치중"
              }
              progress={
                status === "firmwareDownloading"
                  ? downloadingProgress
                  : installingProgress
              }
            />
          )}
          {status.includes("Success") && (
            <Success
              status={status}
              handleNext={next}
              handlePreRender={handlePreRenderPreSafetyZoneMap}
            />
          )}
          {status.includes("Fail") && (
            <Fail status={status} handleRetry={handleRetry} />
          )}
        </ScreenWidthContainer>
      )}
      {!isOtaUpdate && (
        <>
          {renderPreSafetyZoneMap && (
            <ScreenWidthContainer>
              <PreSafetyZoneMap
                next={next}
                handlePreRender={handlePreRenderSafetyZoneMap}
              />
            </ScreenWidthContainer>
          )}
          {renderSafetyZoneMap && (
            <ScreenWidthContainer>
              <SafetyZoneMap
                next={next}
                handlePreRender={handlePreRenderProfileForm}
              />
            </ScreenWidthContainer>
          )}
          {renderProfleForm && <DeviceProfileForm next={next} />}
        </>
      )}
    </>
  );
};

export default AddDeviceRoot;
