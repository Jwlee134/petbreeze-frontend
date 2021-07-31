import React from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";

const Text = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const Timer = () => {
  const duration = useAppSelector(state => state.storage.walk.duration);

  const hour = Math.floor(duration / 3600) % 60;
  const min = Math.floor(duration / 60) % 60;
  const sec = Math.floor(duration) % 60;

  return (
    <Text>
      {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
      {sec < 10 ? `0${sec}` : sec}
    </Text>
  );
};

export default Timer;
