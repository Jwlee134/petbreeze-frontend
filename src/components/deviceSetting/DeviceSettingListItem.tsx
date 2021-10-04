import React, { useContext } from "react";
import styled from "styled-components/native";
import { DimensionsContext } from "~/context/DimensionsContext";
import { IDevice } from "~/store/device";
import palette from "~/styles/palette";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import MyText from "../common/MyText";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DeviceSettingListItem = ({ device }: { device: IDevice }) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <RowContainer
      style={{
        flexGrow: 1,
        justifyContent: "space-between",
        marginRight: rpWidth(25),
      }}>
      <RowContainer>
        <AnimatedCircularProgress
          lineWidth={2}
          circleWidth={70}
          battery={device.battery}
        />
        <MyText
          style={{
            marginLeft: rpWidth(26),
            marginRight: rpWidth(13),
          }}
          fontWeight="medium">
          {device.name}
        </MyText>
        <MyText color={palette.blue_7b} fontSize={14}>
          {device.battery}%
        </MyText>
      </RowContainer>
      <MyText fontSize={14} color="rgba(0, 0, 0, 0.5)">
        5분
      </MyText>
    </RowContainer>
  );
};

export default React.memo(DeviceSettingListItem);
