import React from "react";
import { useState } from "react";
import Auth from "~/components/init/Auth";
import DeviceCheck from "~/components/init/DeviceCheck";
import Permissions from "~/components/init/Permissions";
import { useAppSelector } from "~/store";
import { isIos } from "~/utils";
import SafetyZoneSetting from "~/components/device/SafetyZoneSetting";
import SafetyZoneMap from "~/components/device/SafetyZoneMap";
import DeviceProfileForm from "~/components/device/DeviceProfileForm";
import Completion from "~/components/init/Completion";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import useBleMaganer from "~/hooks/useBleManager";
import Progress from "~/components/device/Progress";
import BluetoothCheck from "~/components/device/BluetoothCheck";
import Intro from "~/components/Intro";

const Init = () => {
  const token = useAppSelector(state => state.storage.user.token);
  const step = useAppSelector(state => state.storage.init);
  const deviceStatus = useAppSelector(state => state.storage.device);

  const [renderPermission] = useState(!step.isPermissionAllowed && isIos);
  const [renderAuth] = useState(!token);
  const [renderDevice] = useState(!deviceStatus.isDeviceRegistered);
  const [renderSafetyZone] = useState(!deviceStatus.isSafetyZoneRegistered);
  const [renderPetProfile] = useState(!deviceStatus.isProfileRegistered);

  const { PagingScrollView } = usePagingScrollView();
  const { status: status, setStatus, progress } = useBleMaganer();

  if (!step.isIntroPassed) {
    return <Intro />;
  }

  return (
    <PagingScrollView
      scrollEnabled={false}
      contentContainerStyle={{ marginBottom: isIos ? 24 : 0 }}>
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

export default Init;
