import React from "react";
import BluetoothCheck from "~/components/device/BluetoothCheck";
import DeviceRegistrationProgress from "~/components/device/DeviceRegistrationProgress";
import PreStart from "~/components/device/PreStart";
import usePagingFlatList from "~/hooks/usePagingFlatList";
import { AddDeviceScreenRouteProp } from "~/types/navigator";

const AddDevice = ({ route }: { route: AddDeviceScreenRouteProp }) => {
  const { PagingFlatList, next } = usePagingFlatList();

  const data = [
    <PreStart next={next} />,
    <BluetoothCheck next={next} />,
    <DeviceRegistrationProgress
      isOtaUpdate={route?.params?.isOtaUpdate}
      next={next}
    />,
  ];

  return <PagingFlatList data={data} />;
};

export default AddDevice;
