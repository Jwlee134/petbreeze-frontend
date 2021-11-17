import React, { useContext, useEffect, useRef, useState } from "react";
import { useAppSelector } from "~/store";
import TimerSVG from "~/assets/svg/walk/timer.svg";
import MyText from "../common/MyText";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { DimensionsContext } from "~/context/DimensionsContext";
import { useNavigation } from "@react-navigation/native";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import deviceApi from "~/api/device";
import { WalkContext } from "~/context/WalkContext";
import allSettled from "promise.allsettled";
import backgroundTracking from "~/utils/backgroundTracking";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Timer = () => {
  const [startWalking] = deviceApi.useStartWalkingMutation();
  const selectedIDs = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const navigation = useNavigation<WalkMapScreenNavigationProp>();
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
  const { rpWidth } = useContext(DimensionsContext);
  const { deviceList } = useContext(WalkContext);

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
      dispatch(
        storageActions.setWalk({
          duration,
        }),
      );
    }
  }, [isWalking, duration]);

  useEffect(() => {
    if (duration === 60) {
      (async () => {
        const results = await allSettled(
          selectedIDs.map(
            id =>
              new Promise((resolve, reject) => {
                startWalking(id)
                  .unwrap()
                  .then(() => {
                    resolve(id);
                  })
                  .catch(() => {
                    reject(id);
                  });
              }),
          ),
        );
        const rejectedIDs = results
          .filter(result => result.status === "rejected")
          ?.map(
            result =>
              deviceList[
                deviceList.findIndex(device => device.id === result.reason)
              ].id,
          );

        if (rejectedIDs.length) {
          const filtered = selectedIDs.filter(id => !rejectedIDs.includes(id));
          if (!filtered.length) {
            await backgroundTracking.stop();
            setTimeout(() => {
              dispatch(storageActions.setWalk(null));
            }, 200);
            navigation.replace("BottomTabNav", {
              initialRouteName: "WalkTab",
            });
          } else {
            dispatch(
              storageActions.setWalk({
                selectedDeviceId: filtered,
              }),
            );
          }
        }
      })();
    }
  }, [duration]);

  return (
    <RowContainer>
      <TimerSVG
        width={rpWidth(22)}
        height={rpWidth(27)}
        style={{ marginRight: rpWidth(17) }}
      />
      <MyText fontSize={18} color="rgba(0, 0, 0, 0.5)">
        {hour} : {min.toString().padStart(2, "0")} :{" "}
        {sec.toString().padStart(2, "0")}
      </MyText>
    </RowContainer>
  );
};

export default Timer;
