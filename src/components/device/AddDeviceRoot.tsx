import React from "react";
import { useState } from "react";
import useBleMaganer from "~/hooks/useBleManager";
import { useAppSelector } from "~/store";
import BluetoothCheck from "./BluetoothCheck";
import DeviceProfileForm from "./DeviceProfileForm";
import Fail from "./Fail";
import FirmwareDownloading from "./FirmwareDownloading";
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
  const { status, setStatus, progress } = useBleMaganer({ isOtaUpdate });

  const [renderPreStart] = useState(!isDeviceRegistered);
  const [renderBluetoothCheck, setRenderBluetoothCheck] = useState(false);
  const [renderProgress, setRenderProgress] = useState(false);
  const [renderSafetyZoneMap, setRenderSafetyZoneMap] = useState(
    isDeviceRegistered && !isSafetyZoneRegistered,
  );
  const [renderProfleForm, setRenderProfileForm] = useState(
    isDeviceRegistered && isSafetyZoneRegistered && !isProfileRegistered,
  );

  return (
    <>
      {renderPreStart && (
        <ScreenWidthContainer>
          <PreStart
            handleNext={next}
            handlePreRender={() => setRenderBluetoothCheck(true)}
          />
        </ScreenWidthContainer>
      )}
      {renderBluetoothCheck && (
        <ScreenWidthContainer>
          <BluetoothCheck
            handlePreRender={() => setRenderProgress(true)}
            handleNext={() => {
              next();
              setStatus({
                value: "firmwareDownloading",
                text: "디바이스 검색중",
              });
            }}
          />
        </ScreenWidthContainer>
      )}
      {renderProgress && (
        <ScreenWidthContainer>
          {status.value === "scanning" && <Scanning />}
          {status.value === "firmwareDownloading" && (
            <FirmwareDownloading progress={progress} />
          )}
          {status.value.includes("success") && (
            <Success
              status={status}
              handleNext={next}
              handlePreRender={() => setRenderSafetyZoneMap(true)}
            />
          )}
          {status.value.includes("Fail") && (
            <Fail
              status={status}
              handleRetry={() => {
                switch (status.value) {
                  case "scanningFail":
                    setStatus({
                      value: "scanning",
                      text: "디바이스 검색중",
                    });
                    break;
                  case "downloadingFail":
                    setStatus({
                      value: "firmwareDownloading",
                      text: "펌웨어 다운로드중",
                    });
                }
              }}
            />
          )}
        </ScreenWidthContainer>
      )}
      {!isOtaUpdate && (
        <>
          {renderSafetyZoneMap && (
            <>
              <PreSafetyZoneMap next={next} />
              <SafetyZoneMap
                next={next}
                handlePreRender={() => {
                  setRenderProfileForm(true);
                }}
              />
            </>
          )}
          {renderProfleForm && <DeviceProfileForm next={next} />}
        </>
      )}
    </>
  );
};

export default AddDeviceRoot;
