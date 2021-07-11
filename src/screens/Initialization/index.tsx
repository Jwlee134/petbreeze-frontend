import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import InteractionWithDevice from "~/components/device/InteractionWithDevice";
import Auth from "~/components/initialization/Auth";
import BluetoothCheck from "~/components/device/BluetoothCheck";
import DeviceCheck from "~/components/initialization/DeviceCheck";
import Permissions from "~/components/initialization/Permissions";
import { useAppSelector } from "~/store";
import { width } from "~/styles";
import { isIos } from "~/utils";
import SafetyZoneSetting from "~/components/device/SafetyZoneSetting";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import SafetyZoneMap from "~/components/device/SafetyZoneMap";
import PetProfileForm from "~/components/device/PetProfileForm";
import Completion from "~/components/initialization/Completion";
import { storageActions } from "~/store/storage";
import useOTAUpdate from "~/hooks/useOTAUpdate";

const Initialization = () => {
  const dispatch = useDispatch();

  const page = useAppSelector(state => state.common.page);
  const token = useAppSelector(state => state.storage.user.token);
  const status = useAppSelector(state => state.storage.initialization);

  const scrollViewRef = useRef<ScrollView>(null);

  const [renderPermission] = useState(!status.isPermissionAllowed && isIos);
  const [renderAuth] = useState(!token);
  const [renderDevice] = useState(!status.isDeviceRegistered);
  const [renderSafetyZone] = useState(!status.isSafetyZoneRegistered);
  const [renderPetProfile] = useState(!status.isPetProfileRegistered);

  useEffect(() => {
    if (scrollViewRef.current && page) {
      scrollViewRef.current.scrollTo({
        x: width * page,
        animated: true,
      });
    }
  }, [page]);

  const { status: OTAStatus, setStatus, progress, disconnect } = useOTAUpdate();

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      bounces={false}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginBottom: isIos ? 24 : 0 }}>
      {isIos && renderPermission && <Permissions />}
      {renderAuth && <Auth />}
      {renderDevice && (
        <>
          <DeviceCheck />
          <BluetoothCheck
            handleNext={() => {
              dispatch(commonActions.setPage("next"));
              setStatus({
                value: "searching",
                text: "디바이스 검색 중...",
              });
            }}
          />
          <InteractionWithDevice
            status={OTAStatus}
            setStatus={setStatus}
            progress={progress}
            handleComplete={() => {
              dispatch(commonActions.setPage("next"));
              dispatch(storageActions.setInitialization("device"));
              disconnect();
            }}
          />
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
        <PetProfileForm
          handleComplete={() => {
            dispatch(commonActions.setPage("next"));
            dispatch(storageActions.setInitialization("petProfile"));
          }}
        />
      )}
      <Completion />
    </ScrollView>
  );
};

export default Initialization;
