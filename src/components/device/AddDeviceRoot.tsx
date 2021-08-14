import React from "react";
import useBleMaganer from "~/hooks/useBleManager";
import BluetoothCheck from "./BluetoothCheck";
import DeviceProfileForm from "./DeviceProfileForm";
import Progress from "./Progress";
import SafetyZoneMap from "./SafetyZoneMap";

const AddDeviceRoot = ({
  isOtaUpdate = false,
  next,
}: {
  isOtaUpdate?: boolean;
  next: () => void;
}) => {
  const { status, setStatus, progress } = useBleMaganer({ isOtaUpdate });

  return (
    <>
      <BluetoothCheck setStatus={setStatus} next={next} />
      <Progress
        status={status}
        setStatus={setStatus}
        progress={progress}
        next={next}
      />
      {!isOtaUpdate && (
        <>
          <SafetyZoneMap next={next} />
          <DeviceProfileForm next={next} />
        </>
      )}
    </>
  );
};

export default AddDeviceRoot;
