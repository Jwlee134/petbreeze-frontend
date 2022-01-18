import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "~/store";
import TimerSVG from "~/assets/svg/walk/timer.svg";
import MyText from "../common/MyText";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import deviceApi from "~/api/device";
import allSettled from "promise.allsettled";
import palette from "~/styles/palette";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  padding-right: 22.5px;
`;

const Timer = () => {
  const [sendNotification] = deviceApi.useSendWalkNotificationMutation();
  const selectedIDs = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
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
      dispatch(storageActions.setWalk({ duration }));
    }
    if (duration === 60) {
      dispatch(storageActions.setWalk({ duration }));
      allSettled(selectedIDs.map(id => sendNotification(id)));
    }
  }, [isWalking, duration]);

  useEffect(() => {
    if (startTime && duration !== 0) {
      dispatch(storageActions.setWalk({ duration: getDuration() }));
    }
  }, []);

  return (
    <RowContainer>
      <TimerSVG style={{ marginRight: 17 }} />
      <MyText fontSize={24} color={palette.blue_7b}>
        {hour > 0 ? `${hour} : ` : ""}
        {min.toString().padStart(2, "0")} : {sec.toString().padStart(2, "0")}
      </MyText>
    </RowContainer>
  );
};

export default Timer;
