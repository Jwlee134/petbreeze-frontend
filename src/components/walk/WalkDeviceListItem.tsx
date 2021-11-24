import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Device } from "~/api/device";
import { noName } from "~/constants";
import palette from "~/styles/palette";
import { formatCreatedAt } from "~/utils";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import MyText from "../common/MyText";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WalkDeviceListItem = ({ device }: { device: Device }) => {
  return (
    <RowContainer>
      <AnimatedCircularProgress
        avatar={device.profile_image}
        isBackgroundTransparent
        lineWidth={2}
        circleWidth={70}
        battery={device.battery}
      />
      <View style={{ marginLeft: 26 }}>
        <RowContainer>
          <MyText fontWeight="medium">{device.name || noName}</MyText>
          <MyText
            fontSize={12}
            color={palette.blue_7b}
            style={{ marginLeft: 12 }}>
            {device.battery || 0}%
          </MyText>
        </RowContainer>
        {device.last_walk ? (
          <MyText
            style={{ marginTop: 5 }}
            fontSize={12}
            color="rgba(0, 0, 0, 0.5)">
            마지막 산책{"   "}
            {formatCreatedAt(device.last_walk)}
          </MyText>
        ) : null}
      </View>
    </RowContainer>
  );
};

export default WalkDeviceListItem;
