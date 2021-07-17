import React from "react";
import { useState } from "react";
import Auth from "~/components/initialization/Auth";
import DeviceCheck from "~/components/initialization/DeviceCheck";
import Permissions from "~/components/initialization/Permissions";
import { useAppSelector } from "~/store";
import { isIos } from "~/utils";
import SafetyZoneSetting from "~/components/device/SafetyZoneSetting";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import SafetyZoneMap from "~/components/device/SafetyZoneMap";
import DeviceProfileForm from "~/components/device/DeviceProfileForm";
import Completion from "~/components/initialization/Completion";
import { storageActions } from "~/store/storage";
import usePagingScrollView from "~/hooks/usePagingScrollView";
import DeviceInteraction from "~/components/device";

const Initialization = () => {
  const dispatch = useDispatch();

  const token = useAppSelector(state => state.storage.user.token);
  const status = useAppSelector(state => state.storage.initialization);

  const [renderPermission] = useState(!status.isPermissionAllowed && isIos);
  const [renderAuth] = useState(!token);
  const [renderDevice] = useState(!status.isDeviceRegistered);
  const [renderSafetyZone] = useState(!status.isSafetyZoneRegistered);
  const [renderPetProfile] = useState(!status.isPetProfileRegistered);

  const { PagingScrollView } = usePagingScrollView();

  return (
    <PagingScrollView>
      {renderPermission && <Permissions />}
      {renderAuth && <Auth />}
      {renderDevice && (
        <>
          <DeviceCheck />
          <DeviceInteraction />
        </>
      )}
      {renderSafetyZone && (
        <>
          <SafetyZoneSetting />
          <SafetyZoneMap
            handleComplete={() => {
              dispatch(commonActions.setPage("next"));
              dispatch(storageActions.setInitialization("safetZone"));
            }}
          />
        </>
      )}
      {renderPetProfile && (
        <DeviceProfileForm
          handleComplete={() => {
            dispatch(commonActions.setPage("next"));
            dispatch(storageActions.setInitialization("petProfile"));
          }}
        />
      )}
      <Completion
        handleClose={() => {
          dispatch(storageActions.setInitialization("initialization"));
          dispatch(commonActions.setPage("init"));
        }}
      />
    </PagingScrollView>
  );
};

export default Initialization;
