import React from "react";
import Auth from "~/components/init/Auth";
import Permissions from "~/components/init/Permissions";
import { store, useAppSelector } from "~/store";
import Intro from "~/components/Intro";
import usePagingFlatList from "~/hooks/usePagingFlatList";
import PreStart from "~/components/device/PreStart";
import BluetoothCheck from "~/components/device/BluetoothCheck";
import DeviceRegistrationProgress from "~/components/device/DeviceRegistrationProgress";
import PreSafetyZoneMap from "~/components/device/PreSafetyZoneMap";
import SafetyZone from "~/components/device/SafetyZone";
import { isIos } from "~/utils";
import { useMemo } from "react";
import RegisterProfileFirst from "~/components/device/registerProfile/RegisterProfileFirst";
import RegisterProfileSecond from "~/components/device/registerProfile/RegisterProfileSecond";
import RegisterProfileThird from "~/components/device/registerProfile/RegisterProfileThird";
import Completion from "~/components/init/Completion";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";

const Init = () => {
  const isIntroPassed = useAppSelector(
    state => state.storage.init.isIntroPassed,
  );
  const isProfileRegistered = useAppSelector(
    state => state.storage.device.isProfileRegistered,
  );
  const dispatch = useDispatch();

  const initialIndex = useMemo(() => {
    const {
      user: { token },
      init: { isPermissionAllowed },
      device: { isDeviceRegistered, isSafetyZoneRegistered },
    } = store.getState().storage;

    if (isSafetyZoneRegistered) {
      if (isIos) return 7;
      else 6;
    }
    if (isDeviceRegistered) {
      if (isIos) return 5;
      else 4;
    }
    if (isIos && isPermissionAllowed) return 2;
    if (token) return 1;
  }, []);

  const { PagingFlatList, next } = usePagingFlatList({ initialIndex });

  const showCompletion = useCallback(() => {
    dispatch(storageActions.setDeviceRegistrationStep("profile"));
  }, []);

  const data = [
    <Auth next={next} />,
    ...(isIos ? [<Permissions next={next} />] : []),
    <SafetyZone next={next} />,
    <PreStart next={next} />,
    <BluetoothCheck next={next} />,
    <DeviceRegistrationProgress next={next} />,
    <PreSafetyZoneMap next={next} />,
    <RegisterProfileFirst next={next} />,
    <RegisterProfileSecond next={next} />,
    <RegisterProfileThird next={showCompletion} />,
  ];

  if (!isIntroPassed) {
    return <Intro />;
  }

  return (
    <>
      {!isProfileRegistered ? <PagingFlatList data={data} /> : <Completion />}
    </>
  );
};

export default Init;
