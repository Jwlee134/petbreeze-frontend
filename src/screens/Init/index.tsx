import React from "react";
import { useState } from "react";
import Auth from "~/components/init/Auth";
import DeviceCheck from "~/components/device/PreStart";
import Permissions from "~/components/init/Permissions";
import { useAppSelector } from "~/store";
import { isIos } from "~/utils";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import Intro from "~/components/Intro";
import AddDeviceRoot from "~/components/device/AddDeviceRoot";

const Init = () => {
  const token = useAppSelector(state => state.storage.user.token);
  const { isIntroPassed, isPermissionAllowed } = useAppSelector(
    state => state.storage.init,
  );
  const isDeviceRegistered = useAppSelector(
    state => state.storage.device.isDeviceRegistered,
  );

  const [renderAuth] = useState(!token);
  const [renderPermission, setRenderPermission] = useState(
    isIos && (token && !isPermissionAllowed ? true : false),
  );
  const [renderAddDevice, setRenderAddDevice] = useState(
    !!token && (isIos ? isPermissionAllowed : true),
  );

  const { PagingScrollView, ScreenWidthContainer, next } =
    usePagingScrollView();

  if (!isIntroPassed) {
    return <Intro />;
  }

  return (
    <PagingScrollView scrollEnabled={false}>
      {renderAuth && (
        <ScreenWidthContainer>
          <Auth
            handlePreRender={() => {
              isIos ? setRenderPermission(true) : setRenderAddDevice(true);
            }}
            next={next}
          />
        </ScreenWidthContainer>
      )}
      {renderPermission && (
        <ScreenWidthContainer>
          <Permissions
            handlePreRender={() => setRenderAddDevice(true)}
            next={next}
          />
        </ScreenWidthContainer>
      )}
      {renderAddDevice && (
        <AddDeviceRoot
          ScreenWidthContainer={ScreenWidthContainer}
          next={next}
        />
      )}
    </PagingScrollView>
  );
};

export default Init;
