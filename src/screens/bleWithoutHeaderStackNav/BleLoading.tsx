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
    if (status.includes("Fail")) {
      navigation.replace("Fail");
    }
  }, [status]);

  return <Loading loadingText={route.params.loadingText} />;
};

export default BleLoading;
