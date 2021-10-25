import React, { useEffect } from "react";
import Loading from "~/components/common/Loading";
import { useAppSelector } from "~/store";
import { BleLoadingScreenNavigationProp } from "~/types/navigator";

const BleLoading = ({
  navigation,
}: {
  navigation: BleLoadingScreenNavigationProp;
}) => {
  const status = useAppSelector(state => state.ble.status);
  const loadingText = useAppSelector(state => state.navigator.loadingText);

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

  return <Loading loadingText={loadingText} />;
};

export default BleLoading;
