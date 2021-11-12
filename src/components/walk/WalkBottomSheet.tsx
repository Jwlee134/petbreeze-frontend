import React, { useEffect } from "react";
import styled from "styled-components/native";
import Timer from "./Timer";
import Distance from "./Distance";
import Toggle from "./Toggle";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { useAppSelector } from "~/store";
import backgroundTracking from "~/utils/backgroundTracking";
import BottomSheet from "../common/BottomSheet";
import Result from "./Result";

interface Props {
  handleChange: (index: number) => void;
  snapPoints: number[];
}

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const WalkBottomSheet = ({ handleChange, snapPoints }: Props) => {
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const startTime = useAppSelector(state => state.storage.walk.startTime);
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isWalking && !backgroundTracking.isRunning()) {
      backgroundTracking.start();
    }
    if (!isWalking && backgroundTracking.isRunning()) {
      backgroundTracking.stop();
    }
  }, [isWalking]);

  useEffect(() => {
    const init = async () => {
      if (backgroundTracking.isRunning() || isStopped || startTime) return;
      await backgroundTracking.start();
      dispatch(
        storageActions.setWalk({
          isWalking: true,
          startTime: new Date().toISOString(),
        }),
      );
    };
    init();
  }, []);

  return (
    <BottomSheet
      onChange={handleChange}
      index={isStopped ? 0 : 1}
      snapPoints={snapPoints}>
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
