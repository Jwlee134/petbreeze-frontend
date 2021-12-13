import deviceApi from "~/api/device";

const useDevice = () => {
  const { data } = deviceApi.useGetDeviceListQuery(undefined, {
    pollingInterval: 60000,
  });

  return data;
};

export default useDevice;
