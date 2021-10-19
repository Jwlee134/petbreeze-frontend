import React, { useContext } from "react";
import styled from "styled-components/native";
import { Device } from "~/api/device";
import { noName } from "~/constants";
import { DimensionsContext } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import AnimatedCircularProgress from "../../common/AnimatedCircularProgress";
import MyText from "../../common/MyText";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DeviceSettingListItem = ({ device }: { device: Device }) => {
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
          avatar={device.profile_image}
        />
        <MyText
          style={{
            marginLeft: rpWidth(26),
            marginRight: rpWidth(13),
          }}
          fontWeight="medium">
          {device.name || noName}
        </MyText>
        <MyText color={palette.blue_7b} fontSize={14}>
          {device.battery || 0}%
        </MyText>
      </RowContainer>
      {/* <MyText fontSize={14} color="rgba(0, 0, 0, 0.5)">
        5분
      </MyText> */}
    </RowContainer>
  );
};

export default React.memo(DeviceSettingListItem);
