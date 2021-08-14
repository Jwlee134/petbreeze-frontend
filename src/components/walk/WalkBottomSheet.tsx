import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import Timer from "./Timer";
import Distance from "./Distance";
import Toggle from "./Toggle";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { store, useAppSelector } from "~/store";
import useMyLocation from "~/hooks/useMyLocation";
import Button from "../common/Button";
import BackgroundService from "react-native-background-actions";
import { Text } from "react-native";
import useBottomSheet from "~/hooks/useBottomSheet";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
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

const WalkBottomSheet = ({
  handleFinish,
  handleChange,
  snapPoints,
}: {
  handleFinish: () => Promise<void>;
  handleChange: (index: number) => void;
  snapPoints: number[];
}) => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const dispatch = useDispatch();

  const timer = useRef<NodeJS.Timeout>();

  const { BottomSheetComponent, sheetRef } = useBottomSheet();
  const { clearTracking, setCoords } = useMyLocation({ isWalking: true });

  const handleStop = async () => {
    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
      clearTracking();
    }
    dispatch(storageActions.setIsStopped(true));
    sheetRef.current?.snapTo(0);
  };

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
  }, []);

  return (
    <BottomSheetComponent
      onChange={handleChange}
      index={1}
      snapPoints={snapPoints}>
      {isStopped && (
        <Text>
          {/*     {format(
        new Date(store.getState().storage.walk.startTime),
        "yyyy년 M월 d일의 산책 h,m",
      )} */}
        </Text>
      )}
      <RowContainer>
        <Timer />
        <Distance />
      </RowContainer>
      {!isStopped && <Toggle handleStop={handleStop} />}
      {isStopped && <Button onPress={handleFinish}>산책 종료</Button>}
    </BottomSheetComponent>
  );
};

export default WalkBottomSheet;
