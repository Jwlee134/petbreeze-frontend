import React from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import MyText from "../common/MyText";
import Path from "~/assets/svg/walk/path.svg";
import { formatWalkDistance } from "~/utils";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Distance = () => {
  const meter = useAppSelector(state => state.storage.walk.meter);

  return (
    <RowContainer>
      <Path width={21} height={22} style={{ marginRight: 17 }} />
      <MyText fontSize={18} color="rgba(0, 0, 0, 0.5)">
        {formatWalkDistance(meter)}
      </MyText>
    </RowContainer>
  );
};

export default Distance;
