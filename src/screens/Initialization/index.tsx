import React from "react";
import { useState } from "react";
import Auth from "~/components/initialization/Auth";
import DeviceCheck from "~/components/initialization/DeviceCheck";
import Permissions from "~/components/initialization/Permissions";
import { useAppSelector } from "~/store";
import { isIos } from "~/utils";
import SafetyZoneSetting from "~/components/device/SafetyZoneSetting";
import SafetyZoneMap from "~/components/device/SafetyZoneMap";
import DeviceProfileForm from "~/components/device/DeviceProfileForm";
import Completion from "~/components/initialization/Completion";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import useBleMaganer from "~/hooks/useBleManager";
import Progress from "~/components/device/Progress";
import BluetoothCheck from "~/components/device/BluetoothCheck";

const Initialization = () => {
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
          <BluetoothCheck setStatus={setStatus} />
          <Progress status={status} setStatus={setStatus} progress={progress} />
        </>
      )}
      {renderSafetyZone && (
        <>
          <SafetyZoneSetting />
          <SafetyZoneMap />
        </>
      )}
      {renderPetProfile && <DeviceProfileForm />}
      <Completion />
    </PagingScrollView>
  );
};

export default Initialization;
