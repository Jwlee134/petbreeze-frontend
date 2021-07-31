import React from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";

const Text = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const Distance = () => {
  const meter = useAppSelector(state => state.storage.walk.meter);

  return (
    <Text>
      거리{" "}
      {meter < 1000 ? `${meter}m` : `${String(meter / 1000).substring(0, 4)}km`}
    </Text>
  );
};

export default Distance;
