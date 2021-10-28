import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import deviceApi from "~/api/device";
import { storageActions } from "~/store/storage";

const useDevice = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { data } = deviceApi.useGetDeviceListQuery(undefined, {
    skip: !isFocused,
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(storageActions.setNumOfDevice(data.length));
    }
  }, [data]);

  return data;
};

export default useDevice;
