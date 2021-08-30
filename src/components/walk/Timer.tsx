import React from "react";
import { useAppSelector } from "~/store";
import TimerSVG from "~/assets/svg/walk/timer.svg";
import TimerGraySVG from "~/assets/svg/walk/timer-gray.svg";
import MyText from "../common/MyText";
import { rpHeight, rpWidth } from "~/styles";
import styled from "styled-components/native";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Timer = () => {
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const startTime = useAppSelector(state => state.storage.walk.startTime);
  const currentPauseTime = useAppSelector(
    state => state.storage.walk.currentPauseTime,
  );
  const totalPauseDuration = useAppSelector(
    state => state.storage.walk.totalPauseDuration,
  );
  const dispatch = useDispatch();
  const timeout = useRef<NodeJS.Timeout>();

  const getDuration = () => {
    if (!isWalking && currentPauseTime) {
      return Math.floor(
        (new Date(currentPauseTime).getTime() -
          new Date(startTime).getTime() -
          totalPauseDuration * 1000) /
          1000,
      );
    }
    if (isWalking) {
      return Math.floor(
        (Date.now() -
          new Date(startTime).getTime() -
          totalPauseDuration * 1000) /
          1000,
      );
    }
    return 0;
  };

  const [duration, setDuration] = useState(!startTime ? 0 : getDuration());

  const hour = Math.floor(duration / 3600) % 60;
  const min = Math.floor(duration / 60) % 60;
  const sec = Math.floor(duration) % 60;

  const runTimer = async () => {
    await new Promise<void>(resolve => {
      timeout.current = setTimeout(resolve, 1000);
    });
    setDuration(prev => prev + 1);
  };

  const clearTimer = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  useEffect(() => {
    if (isWalking) {
      runTimer();
    } else {
      clearTimer();
    }
    return () => clearTimer();
  }, [isWalking, duration]);

  useEffect(() => {
    if (isStopped) {
      dispatch(storageActions.setDuration(duration));
    }
  }, [isStopped]);

  return (
    <RowContainer>
      {isStopped ? (
        <TimerGraySVG
          width={rpWidth(22)}
          height={rpHeight(27)}
          style={{ marginRight: rpWidth(17) }}
        />
      ) : (
        <TimerSVG
          width={rpWidth(22)}
          height={rpHeight(27)}
          style={{ marginRight: rpWidth(17) }}
        />
      )}
      <MyText fontSize={18} color="rgba(0, 0, 0, 0.5)">
        {hour < 10 ? `${hour}` : hour} : {min < 10 ? `0${min}` : min} :{" "}
        {sec < 10 ? `0${sec}` : sec}
      </MyText>
    </RowContainer>
  );
};

export default Timer;
