import React from "react";
import styled from "styled-components/native";
import { Device } from "~/api/device";
import { noName } from "~/constants";
import palette from "~/styles/palette";
import {
  DeviceManagementScreenNavigationProp,
  MyPageScreenNavigationProp,
} from "~/types/navigator";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import ListItem from "../common/ListItem";
import MyText from "../common/MyText";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

const Communication = styled.View`
  width: 50px;
  margin-bottom: 1px;
`;

interface Props {
  device: Device;
  navigation: MyPageScreenNavigationProp | DeviceManagementScreenNavigationProp;
}

const DeviceListItem = ({ device, navigation }: Props) => (
  <ListItem
    onPress={() => {
      navigation.navigate("DeviceSetting", {
        deviceID: device.id,
        avatar: device.profile_image,
        name: device.name,
      });
    }}>
    <RowContainer>
      <AnimatedCircularProgress
        lineWidth={3}
        circleWidth={76}
        battery={device.battery}
        avatar={device.profile_image}
      />
      <MyText style={{ marginLeft: 24, marginRight: 12 }} fontWeight="medium">
        {device.name || noName}
      </MyText>
      <MyText color={palette.blue_7b} fontSize={14}>
        {device.battery || 0}%
      </MyText>
    </RowContainer>
    <Communication>
      <MyText fontSize={14} color="rgba(0, 0, 0, 0.5)">
        LTE
      </MyText>
    </Communication>
  </ListItem>
);

export default DeviceListItem;
