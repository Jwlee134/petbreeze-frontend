import React, { useContext } from "react";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import MyText from "../common/MyText";
import Path from "~/assets/svg/walk/path.svg";
import { DimensionsContext } from "~/context/DimensionsContext";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Distance = () => {
  const meter = useAppSelector(state => state.storage.walk.meter);
  const { rpHeight, rpWidth } = useContext(DimensionsContext);

  return (
    <RowContainer>
      <Path
        width={rpWidth(21)}
        height={rpHeight(22)}
        style={{ marginRight: rpWidth(17) }}
      />
      <MyText fontSize={18} color="rgba(0, 0, 0, 0.5)">
        {meter < 1000
          ? `${meter}m`
          : `${String(meter / 1000).substring(0, 4)}km`}
      </MyText>
    </RowContainer>
  );
};

export default Distance;
