import { useIsFocused } from "@react-navigation/native";
import deviceApi from "~/api/device";

const useDevice = () => {
  const isFocused = useIsFocused();
  const { data } = deviceApi.useGetDeviceListQuery(undefined, {
    skip: !isFocused,
    pollingInterval: 60000,
  });

  return data;
};

export default useDevice;
