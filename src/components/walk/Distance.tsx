import React from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import MyText from "../common/MyText";
import Path from "~/assets/svg/walk/path.svg";
import PathGray from "~/assets/svg/walk/path-gray.svg";
import { rpHeight, rpWidth } from "~/styles";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Distance = () => {
  const meter = useAppSelector(state => state.storage.walk.meter);
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);

  return (
    <RowContainer>
      {isStopped ? (
        <PathGray
          width={rpWidth(21)}
          height={rpHeight(22)}
          style={{ marginRight: rpWidth(17) }}
        />
      ) : (
        <Path
          width={rpWidth(21)}
          height={rpHeight(22)}
          style={{ marginRight: rpWidth(17) }}
        />
      )}
      <MyText fontSize={18} color="rgba(0, 0, 0, 0.5)">
        {!meter ? "0.0" : String(meter / 1000).substring(0, 3)}km
      </MyText>
    </RowContainer>
  );
};

export default Distance;
