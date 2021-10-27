import React, { useEffect } from "react";
import Loading from "~/components/common/Loading";
import { useAppSelector } from "~/store";
import { BleLoadingScreenScreenProps } from "~/types/navigator";

const BleLoading = ({ navigation, route }: BleLoadingScreenScreenProps) => {
  const status = useAppSelector(state => state.ble.status);

  useEffect(() => {
    if (status === "downloadingFirmware")
      navigation.replace("FirmwareProgress");
    if (status === "wifiSuccess") navigation.replace("Success");
    if (status === "wifiFail" || status === "devEUIFail")
      navigation.replace("Fail");
    if (status === "retrieveFail" || status === "startNotificationFail")
      navigation.replace("ScanningFail");
    if (status === "notificationFail") navigation.replace("Fail");
    if (status === "relationAdded") navigation.replace("Completion");
  }, [status]);

  return <Loading loadingText={route.params.loadingText} />;
};

export default BleLoading;
