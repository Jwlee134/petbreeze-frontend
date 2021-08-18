import React from "react";
import { useState } from "react";
import Auth from "~/components/init/Auth";
import Permissions from "~/components/init/Permissions";
import { useAppSelector } from "~/store";
import { isIos } from "~/utils";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import Intro from "~/components/Intro";
import AddDeviceRoot from "~/components/device/AddDeviceRoot";
import { useCallback } from "react";
import styled from "styled-components/native";
import { rpHeight, width } from "~/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* const PageBar = styled.View<{ top: number }>`
  width: ${width}px;
  height: ${rpHeight(53)}px;
  background-color: burlywood;
  border-bottom-width: 3px;
`; */

const Init = () => {
  const token = useAppSelector(state => state.storage.user.token);
  const { isIntroPassed, isPermissionAllowed } = useAppSelector(
    state => state.storage.init,
  );
  const isDeviceRegistered = useAppSelector(
    state => state.storage.device.isDeviceRegistered,
  );
  const { top } = useSafeAreaInsets();

  const [renderAuth] = useState(!token);
  const [renderPermission, setRenderPermission] = useState(
    isIos && (token && !isPermissionAllowed ? true : false),
  );
  const [renderAddDevice, setRenderAddDevice] = useState(
    !!token && (isIos ? isPermissionAllowed : true),
  );

  const { PagingScrollView, ScreenWidthContainer, next } =
    usePagingScrollView();

  const handlePreRenderAuth = useCallback(() => {
    isIos ? setRenderPermission(true) : setRenderAddDevice(true);
  }, []);
  const handlePreRenderAddDevice = useCallback(
    () => setRenderAddDevice(true),
    [],
  );

  if (!isIntroPassed) {
    return <Intro />;
  }

  return (
    <>
      {/* <PageBar top={top} /> */}
      <PagingScrollView scrollEnabled={false}>
        {renderAuth && (
          <ScreenWidthContainer>
            <Auth handlePreRender={handlePreRenderAuth} next={next} />
          </ScreenWidthContainer>
        )}
        {renderPermission && (
          <ScreenWidthContainer>
            <Permissions
              handlePreRender={handlePreRenderAddDevice}
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
    </>
  );
};

export default Init;
