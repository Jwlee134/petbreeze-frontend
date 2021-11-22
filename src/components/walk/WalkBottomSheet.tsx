import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components/native";
import Timer from "./Timer";
import Distance from "./Distance";
import Toggle from "./Toggle";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { store, useAppSelector } from "~/store";
import backgroundTracking from "~/utils/backgroundTracking";
import BottomSheet from "../common/BottomSheet";
import Result from "./Result";
import { getDistanceBetween2Points, isIos } from "~/utils";
import Sheet from "@gorhom/bottom-sheet";
import { WalkContext } from "~/context/WalkContext";
import { delta } from "~/constants";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const WalkBottomSheet = ({ snapPoints }: { snapPoints: number[] }) => {
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const startTime = useAppSelector(state => state.storage.walk.startTime);
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const sheetIndex = useAppSelector(state => state.storage.walk.sheetIndex);
  const dispatch = useDispatch();
  const sheetRef = useRef<Sheet>(null);
  const { mapRef, stoppedSnapIndex } = useContext(WalkContext);

  useEffect(() => {
    if (isWalking && !backgroundTracking.isRunning()) {
      backgroundTracking.start();
    }
    if (!isWalking && backgroundTracking.isRunning()) {
      backgroundTracking.stop();
    }
  }, [isWalking]);

  useEffect(() => {
    if (
      !isStopped ||
      !sheetRef.current ||
      !mapRef.current ||
      snapPoints.length !== 1
    ) {
      return;
    }

    sheetRef.current.snapToPosition(stoppedSnapIndex);
    const { coords } = store.getState().storage.walk;

    const maxLat = Math.max(...coords.map(coord => coord[1]));
    const maxLng = Math.max(...coords.map(coord => coord[0]));
    const minLat = Math.min(...coords.map(coord => coord[1]));
    const minLng = Math.min(...coords.map(coord => coord[0]));

    const distance = getDistanceBetween2Points(maxLat, maxLng, minLat, minLng);

    setTimeout(() => {
      if (coords.length === 1) {
        mapRef.current?.animateToRegion({
          latitude: coords[0][1],
          longitude: coords[0][0],
          latitudeDelta: delta,
          longitudeDelta: delta,
        });
      } else {
        mapRef.current?.animateToTwoCoordinates(
          { latitude: maxLat, longitude: maxLng + distance / 100000 },
          { latitude: minLat, longitude: minLng - distance / 100000 },
        );
      }
    }, 200);
  }, [isStopped, sheetRef.current, mapRef.current, snapPoints]);

  useEffect(() => {
    (async () => {
      // iOS 산책이 진행중인 상태에서 앱 껐다가 다시 들어오면 계속 진행
      if (isIos && startTime && isWalking && !backgroundTracking.isRunning()) {
        await backgroundTracking.start();
        return;
      }
      if (backgroundTracking.isRunning() || isStopped || startTime) return;
      await backgroundTracking.start();
      dispatch(
        storageActions.setWalk({
          isWalking: true,
          startTime: new Date().toISOString(),
          sheetIndex: 1,
        }),
      );
    })();
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      onChange={index =>
        dispatch(storageActions.setWalk({ sheetIndex: index }))
      }
      enableOverDrag={!isStopped}
      snapPoints={snapPoints}
      index={sheetIndex}>
      {!isStopped ? (
        <>
          <RowContainer>
            <Timer />
            <Distance />
          </RowContainer>
          <Toggle />
        </>
      ) : (
        <Result />
      )}
    </BottomSheet>
  );
};

export default WalkBottomSheet;
