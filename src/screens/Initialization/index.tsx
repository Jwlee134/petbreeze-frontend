import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import Progress from "~/components/device/Progress";
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
import DeviceProfileForm from "~/components/device/DeviceProfileForm";
import Completion from "~/components/initialization/Completion";
import { storageActions } from "~/store/storage";
import useBleMaganer from "~/hooks/useBleManager";

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

  const {
    status: OTAStatus,
    setStatus,
    progress,
    disconnect,
  } = useBleMaganer();

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
                value: "downloading",
                text: "펌웨어 다운로드 중...",
              });
            }}
          />
          <Progress
            status={OTAStatus}
            setStatus={setStatus}
            progress={progress}
            handleComplete={async () => {
              await disconnect();
              if (OTAStatus.value === "completedWith200") {
                dispatch(storageActions.setInitialization("initialization"));
              } else {
                dispatch(commonActions.setPage("next"));
                dispatch(storageActions.setInitialization("device"));
              }
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
        }}
      />
    </ScrollView>
  );
};

export default Initialization;
