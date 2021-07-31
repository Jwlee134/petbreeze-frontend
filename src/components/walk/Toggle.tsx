import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";

import Camera from "~/assets/svg/camera.svg";
import PauseCircle from "~/assets/svg/pause-circle.svg";
import PlayCircle from "~/assets/svg/play-circle.svg";
import { store, useAppSelector } from "~/store";
import BackgroundService from "react-native-background-actions";
import NaverMapView from "react-native-nmap";

const Button = styled.TouchableOpacity<{ isTransparent?: boolean }>`
  ${({ isTransparent }) =>
    !isTransparent &&
    css`
      width: 46px;
      height: 46px;
      border-radius: 23px;
      background-color: white;
      justify-content: center;
      align-items: center;
    `}
`;

const PauseSquare = styled.View`
  width: 15px;
  height: 15px;
  background-color: ${palette.blue_6e};
`;

const options = {
  taskName: "Example",
  taskTitle: "어디개",
  taskDesc: "산책 중입니다...",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  linkingURI: "petbreeze://walk/map",
};

const Toggle = ({
  setCoords,
  clearTracking,
  mapRef,
  handleFinish,
}: {
  setCoords: () => Promise<number>;
  clearTracking: () => void;
  mapRef: React.RefObject<NaverMapView>;
  handleFinish: () => Promise<void>;
}) => {
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);

  const dispatch = useDispatch();
  const timer = useRef<NodeJS.Timeout>();

  const stopwatch = async () => {
    for (
      let i = store.getState().storage.walk.duration;
      BackgroundService.isRunning();
      i++
    ) {
      dispatch(storageActions.setDuration(i));
      await new Promise<void>(resolve => {
        timer.current = setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  };

  const backgroundTask = async () => {
    await new Promise<void>(() => {
      setCoords()
        .then(trackingId => {
          dispatch(storageActions.setTrackingId(trackingId));
          stopwatch();
        })
        .catch(() => {
          dispatch(storageActions.setIsWalking(false));
          BackgroundService.stop();
        });
    });
  };

  useEffect(() => {
    // 다시 시작
    if (isWalking && !BackgroundService.isRunning()) {
      BackgroundService.start(backgroundTask, options);
    }
    // 일시 정지
    if (!isWalking && BackgroundService.isRunning()) {
      BackgroundService.stop().then(() => {
        clearTracking();
        if (timer.current) {
          clearTimeout(timer.current);
        }
      });
    }
  }, [isWalking]);

  useEffect(() => {
    if (!mapRef.current) return;
    // 최초 접속 시 자동 시작
    if (
      !BackgroundService.isRunning() &&
      store.getState().storage.walk.didMountInitially
    ) {
      BackgroundService.start(backgroundTask, options).then(() => {
        dispatch(storageActions.setDidMountInitially(false));
        dispatch(storageActions.setIsWalking(true));
      });
    }
  }, [mapRef]);

  return (
    <>
      <Button>
        <Camera />
      </Button>
      <Button
        isTransparent
        onPress={() => {
          dispatch(storageActions.setIsWalking(!isWalking));
        }}>
        {isWalking ? <PauseCircle /> : <PlayCircle />}
      </Button>
      <Button onPress={handleFinish}>
        <PauseSquare />
      </Button>
    </>
  );
};

export default Toggle;
