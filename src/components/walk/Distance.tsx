import React from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import MyText from "../common/MyText";
import Path from "~/assets/svg/walk/path.svg";
import { formatWalkDistance } from "~/utils";
import palette from "~/styles/palette";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  padding-left: 22.5px;
`;

const Distance = () => {
  const meter = useAppSelector(state => state.storage.walk.meter);

  return (
    <RowContainer>
      <Path style={{ marginRight: 17 }} />
      <MyText fontSize={24} color={palette.blue_7b}>
        {formatWalkDistance(meter)}
      </MyText>
    </RowContainer>
  );
};

export default Distance;
