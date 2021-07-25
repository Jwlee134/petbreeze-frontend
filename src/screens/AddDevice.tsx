import React from "react";
import BluetoothCheck from "~/components/device/BluetoothCheck";
import DeviceProfileForm from "~/components/device/DeviceProfileForm";
import Progress from "~/components/device/Progress";
import SafetyZoneMap from "~/components/device/SafetyZoneMap";
import useBleMaganer from "~/hooks/useBleManager";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import { AddDeviceScreenRouteProp } from "~/types/navigator";

const AddDevice = ({ route }: { route: AddDeviceScreenRouteProp }) => {
  const { PagingScrollView } = usePagingScrollView();
  const {
    status: status,
    setStatus,
    progress,
  } = useBleMaganer({ isOtaUpdate: route.params.isOtaUpdate });

  return (
    <PagingScrollView>
      <BluetoothCheck setStatus={setStatus} />
      <Progress status={status} setStatus={setStatus} progress={progress} />
      {!route.params.isOtaUpdate && (
        <>
          <SafetyZoneMap />
          <DeviceProfileForm />
        </>
      )}
    </PagingScrollView>
  );
};

export default AddDevice;
