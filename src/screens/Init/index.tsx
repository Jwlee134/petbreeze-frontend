import React from "react";
import { useState } from "react";
import Auth from "~/components/init/Auth";
import DeviceCheck from "~/components/init/DeviceCheck";
import Permissions from "~/components/init/Permissions";
import { useAppSelector } from "~/store";
import { isIos } from "~/utils";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import Intro from "~/components/Intro";
import AddDevice from "../AddDevice";
import styled from "styled-components/native";
import { width } from "~/styles";
import AddDeviceRoot from "~/components/device/AddDeviceRoot";

const Container = styled.View``;

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
  const [renderDeviceCheck, setRenderDeviceCheck] = useState(
    token && (isIos ? isPermissionAllowed : true) && !isDeviceRegistered
      ? true
      : false,
  );
  const [renderAddDevice, setRenderAddDevice] = useState(
    token && (isIos ? isPermissionAllowed : true) && isDeviceRegistered,
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
              isIos ? setRenderPermission(true) : setRenderDeviceCheck(true);
            }}
            next={next}
          />
        </ScreenWidthContainer>
      )}
      {renderPermission && (
        <ScreenWidthContainer>
          <Permissions
            handlePreRender={() => setRenderDeviceCheck(true)}
            next={next}
          />
        </ScreenWidthContainer>
      )}
      {renderDeviceCheck && (
        <ScreenWidthContainer>
          <DeviceCheck
            handlePreRender={() => setRenderAddDevice(true)}
            next={next}
          />
        </ScreenWidthContainer>
      )}
      {renderAddDevice ? <AddDeviceRoot next={next} /> : null}
    </PagingScrollView>
  );
};

export default Init;
