import React from "react";
import { useAppSelector } from "~/store";
import TimerSVG from "~/assets/svg/walk/timer.svg";
import TimerGraySVG from "~/assets/svg/walk/timer-gray.svg";
import MyText from "../common/MyText";
import { rpHeight, rpWidth } from "~/styles";
import styled from "styled-components/native";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Timer = () => {
  const duration = useAppSelector(state => state.storage.walk.duration);
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);

  const hour = Math.floor(duration / 3600) % 60;
  const min = Math.floor(duration / 60) % 60;
  const sec = Math.floor(duration) % 60;

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
