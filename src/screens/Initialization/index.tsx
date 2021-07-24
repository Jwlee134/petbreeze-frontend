import React from "react";
import { useState } from "react";
import Auth from "~/components/initialization/Auth";
import DeviceCheck from "~/components/initialization/DeviceCheck";
import Permissions from "~/components/initialization/Permissions";
import { useAppSelector } from "~/store";
import { isIos } from "~/utils";
import SafetyZoneSetting from "~/components/device/SafetyZoneSetting";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import SafetyZoneMap from "~/components/device/SafetyZoneMap";
import DeviceProfileForm from "~/components/device/DeviceProfileForm";
import Completion from "~/components/initialization/Completion";
import { storageActions } from "~/store/storage";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import useBleMaganer from "~/hooks/useBleManager";
import Progress from "~/components/device/Progress";
import BluetoothCheck from "~/components/device/BluetoothCheck";

const Initialization = () => {
  const dispatch = useDispatch();

  const token = useAppSelector(state => state.storage.user.token);
  const step = useAppSelector(state => state.storage.initialization);
  const deviceStatus = useAppSelector(state => state.storage.device);

  const [renderPermission] = useState(!step.isPermissionAllowed && isIos);
  const [renderAuth] = useState(!token);
  const [renderDevice] = useState(!deviceStatus.isDeviceRegistered);
  const [renderSafetyZone] = useState(!deviceStatus.isSafetyZoneRegistered);
  const [renderPetProfile] = useState(!deviceStatus.isProfileRegistered);

  const { PagingScrollView } = usePagingScrollView();
  const { status: status, setStatus, progress } = useBleMaganer();

  return (
    <PagingScrollView>
      {renderPermission && <Permissions />}
      {renderAuth && <Auth />}
      {renderDevice && (
        <>
          <DeviceCheck />
          <BluetoothCheck
            handleNext={() => {
              dispatch(commonActions.setPage("next"));
              setStatus({
                value: "completed",
                text: "완료되었습니다.",
              });
            }}
          />
          <Progress
            status={status}
            setStatus={setStatus}
            progress={progress}
            handleComplete={() => {
              if (status.value === "completedWith200") {
                dispatch(storageActions.setInitialization("initialization"));
              } else {
                dispatch(commonActions.setPage("next"));
                dispatch(storageActions.setDeviceRegistrationStep("device"));
              }
            }}
          />
        </>
      )}
      {renderSafetyZone && (
        <>
          <SafetyZoneSetting />
          <SafetyZoneMap
            handleComplete={() => {
              dispatch(commonActions.setPage("next"));
              dispatch(storageActions.setDeviceRegistrationStep("safetyZone"));
            }}
          />
        </>
      )}
      {renderPetProfile && (
        <DeviceProfileForm
          handleComplete={() => {
            dispatch(commonActions.setPage("next"));
            dispatch(storageActions.setDeviceRegistrationStep("profile"));
          }}
        />
      )}
      <Completion
        handleClose={() => {
          dispatch(storageActions.setInitialization("initialization"));
          dispatch(storageActions.initDeviceRegistrationStep());
          dispatch(commonActions.setPage("init"));
        }}
      />
    </PagingScrollView>
  );
};

export default Initialization;
