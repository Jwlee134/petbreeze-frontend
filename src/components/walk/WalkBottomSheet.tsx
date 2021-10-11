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
import { isIos } from "~/utils";

interface IProps {
  handleChange: (index: number) => void;
  snapPoints: number[];
}

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const WalkBottomSheet = ({ handleChange, snapPoints }: IProps) => {
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
      if (backgroundTracking.isRunning()) return;
      if (isIos && startTime && !isWalking) return; // iOS에서 산책 일시중지 후 어플 껐다가 다시 접속 시 start() 방지
      await backgroundTracking.start();
      if (!startTime) {
        dispatch(
          storageActions.setWalk({
            isWalking: true,
            startTime: new Date().toISOString(),
          }),
        );
      }
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
