import React from "react";
import AddDeviceRoot from "~/components/device/AddDeviceRoot";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import { AddDeviceScreenRouteProp } from "~/types/navigator";

const AddDevice = ({ route }: { route: AddDeviceScreenRouteProp }) => {
  const { PagingScrollView, ScreenWidthContainer, next } =
    usePagingScrollView();

  return (
    <PagingScrollView scrollEnabled={false}>
      <AddDeviceRoot isOtaUpdate={route?.params?.isOtaUpdate} next={next} />
    </PagingScrollView>
  );
};

export default AddDevice;
