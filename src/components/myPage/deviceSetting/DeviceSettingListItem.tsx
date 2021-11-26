import React from "react";
import styled from "styled-components/native";
import { Device } from "~/api/device";
import { noName } from "~/constants";
import palette from "~/styles/palette";
import AnimatedCircularProgress from "../../common/AnimatedCircularProgress";
import MyText from "../../common/MyText";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DeviceSettingListItem = ({ device }: { device: Device }) => (
  <RowContainer
    style={{
      flexGrow: 1,
      justifyContent: "space-between",
      marginRight: 25,
    }}>
    <RowContainer>
      <AnimatedCircularProgress
        lineWidth={3}
        circleWidth={70}
        battery={device.battery}
        avatar={device.profile_image}
      />
      <MyText
        style={{
          marginLeft: 26,
          marginRight: 13,
        }}
        fontWeight="medium">
        {device.name || noName}
      </MyText>
      <MyText color={palette.blue_7b} fontSize={14}>
        {device.battery || 0}%
      </MyText>
    </RowContainer>
  </RowContainer>
);

export default React.memo(DeviceSettingListItem);
